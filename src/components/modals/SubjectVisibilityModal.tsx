import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSettingsStore, useSettingsActions } from '../../store/settingsStore';
import { getTimetableByGroup } from '../../services/timetable/TimetableService';
import { DaySchedule } from '../../types/global';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LetterIcon from '../ui/letterIcon';
import getCorrectLetter from '../../utils/getCorrectLetter.ts';
import { getCorrectColor } from '../../utils/getCorrectColor';
import { Eraser, Eye, EyeClosed } from 'lucide-react-native';

interface SubjectVisibilityModalProps {
  visible: boolean;
  onClose: () => void;
}

const Check = ({
  checked,
  indeterminate,
  onPress,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} hitSlop={8} style={styles.checkboxBtn}>
    {checked || indeterminate ? (
      <Eye color={'#878787ff'}/>
    ) : (
      <EyeClosed  color={'#878787ff'}/>
    )}
  </TouchableOpacity>
);

const SubjectVisibilityModal: React.FC<SubjectVisibilityModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const groups = useSettingsStore(state => state.groups);
  const hiddenSubjects = useSettingsStore(state => state.hiddenSubjects);
  const { setSubjectHidden, clearHiddenSubjectsForGroup } = useSettingsActions();

  const [loading, setLoading] = useState(false);
  // Map of subject -> list of types available for this subject
  const [bySubject, setBySubject] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const originalHiddenRef = useRef<string[]>([]);
  const openedRef = useRef<boolean>(false);

  const dean = groups.dean;
  // We will use a composite key subject|type to allow toggling per type
  const hiddenSet = useMemo(
    () => new Set((hiddenSubjects[dean || ''] || []).map(s => s)),
    [hiddenSubjects, dean],
  );

  useEffect(() => {
    if (!visible) return;
    async function load() {
      if (!groups.dean) return;
      setLoading(true);
      try {
        const resp = await getTimetableByGroup(
          groups.dean,
          groups.comp || undefined,
          groups.lab || undefined,
          groups.proj || undefined,
        );
        const map: Record<string, Set<string>> = {};
        const add = (name?: string, type?: string) => {
          if (!name || !type) return;
          if (!map[name]) map[name] = new Set<string>();
          map[name].add(type);
        };
        resp.data.forEach((d: DaySchedule) => {
          d.odd.forEach(l => add(l.name, l.type));
          d.even.forEach(l => add(l.name, l.type));
        });
        const normalized: Record<string, string[]> = {};
        Object.entries(map).forEach(([subject, set]) => {
          normalized[subject] = Array.from(set).sort((a, b) => a.localeCompare(b));
        });
        setBySubject(normalized);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [visible, groups.dean, groups.comp, groups.lab, groups.proj]);

  // Snapshot hidden keys once per open
  useEffect(() => {
    if (visible && !openedRef.current) {
      originalHiddenRef.current = [...(hiddenSubjects[groups.dean || ''] || [])];
      openedRef.current = true;
    }
    if (!visible && openedRef.current) {
      openedRef.current = false;
    }
  }, [visible, hiddenSubjects, groups.dean]);

  const makeKey = (subject: string, type: string) => `${subject}|${type}`;

  // Child toggle: checked means visible => hidden = !checked
  const toggleType = (subject: string, type: string, checked: boolean) => {
    if (!dean) return;
    // Ensure legacy subject-only hidden key is cleared so per-type toggles take effect
    setSubjectHidden(dean, subject, false);
    const composite = makeKey(subject, type);
    setSubjectHidden(dean, composite, !checked);
  };

  // Parent toggle: apply to all types for this subject
  const toggleSubjectAll = (subject: string, checked: boolean) => {
    if (!dean) return;
    // Clear legacy subject-only key before applying per-type state
    setSubjectHidden(dean, subject, false);
    const types = bySubject[subject] || [];
    types.forEach(type => {
      const composite = makeKey(subject, type);
      setSubjectHidden(dean, composite, !checked);
    });
  };

  const clearAll = () => {
    if (!dean) return;
    clearHiddenSubjectsForGroup(dean);
  };

  const handleCancel = () => {
    // Revert any changes made while the modal was open
    if (!dean) {
      onClose();
      return;
    }
    // Reset the group's hidden list to the snapshot captured on open
    clearHiddenSubjectsForGroup(dean);
    originalHiddenRef.current.forEach(key => {
      setSubjectHidden(dean, key, true);
    });
    onClose();
  };

  

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{t('manageSubjectsVisibility') || 'Manage subjects visibility'}</Text>
          <Text style={styles.subtitle}>
            {t('subjectsVisibilityDescription') || 'Toggle which subjects should be hidden for this group.'}
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={t('searchPlaceholder') || 'Find...'}
            placeholderTextColor="#999"
            style={styles.search}
          />

          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <FlatList
              data={Object.keys(bySubject)
                .filter(s => s.toLowerCase().includes(query.trim().toLowerCase()))
                .sort()}
              keyExtractor={k => k}
              style={styles.list}
              renderItem={({ item: subject }) => {
                const types = bySubject[subject] || [];
                const keys = types.map(ty => makeKey(subject, ty));
                const visibleCount = keys.filter(k => !hiddenSet.has(k)).length;
                const allChecked = visibleCount === types.length && types.length > 0;
                const someChecked = visibleCount > 0 && !allChecked;
                const isExpanded = expanded.has(subject);
                const toggleExpand = () => {
                  setExpanded(prev => {
                    const next = new Set(prev);
                    if (next.has(subject)) next.delete(subject);
                    else next.add(subject);
                    return next;
                  });
                };

                return (
                  <View style={styles.section}>
                    <Pressable style={styles.headerRow} onPress={toggleExpand}>
                      <TouchableOpacity style={styles.headerLeft} hitSlop={10} onPress={toggleExpand}>
                        <MaterialIcon name={isExpanded ? 'expand-less' : 'expand-more'} size={20} color={'#ccc'} />
                        <Text style={styles.sectionTitle}>{subject}</Text>
                        <Text style={styles.countText}>{`${visibleCount}/${types.length}`}</Text>
                      </TouchableOpacity>
                      <Check
                        checked={allChecked}
                        indeterminate={someChecked && !allChecked}
                        onPress={() => {
                          const nextChecked = !allChecked; // true -> make all visible; false -> hide all
                          toggleSubjectAll(subject, nextChecked);
                        }}
                      />
                    </Pressable>
                    {isExpanded && types.map(ty => {
                      const key = makeKey(subject, ty);
                      const checked = !hiddenSet.has(key);
                      const tyLabel = t(`types.${ty}`) || ty;
                      const letter = getCorrectLetter(ty);
                      const bgColor = getCorrectColor(letter);
                      return (
                        <Pressable
                          onPress={() => {
                            const nextChecked = !checked; // toggle visibility
                            toggleType(subject, ty, nextChecked);
                          }}
                          style={[styles.typeRow, styles.typeRowRounded, { backgroundColor: bgColor + '30' }]} key={key}>
                          <View style={styles.typeLeft}>
                            <LetterIcon bgColor={bgColor} letter={letter} />
                            <Text style={styles.typeLabel}>{tyLabel}</Text>
                          </View>
                          <Check
                             onPress={() => {
                            const nextChecked = !checked; // toggle visibility
                            toggleType(subject, ty, nextChecked);
                          }}
                            checked={checked}
                            
                          />
                        </Pressable>
                      );
                    })}
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={styles.empty}>{t('noItemsAddedInfoText') || 'No items'}</Text>}
            />
          )}

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.resetSquare} onPress={clearAll}>
              <Text style={styles.btnText}><Eraser color={"white"}/></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondary} onPress={handleCancel}>
              <Text style={styles.btnText}>{t('cancel') || 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primary} onPress={onClose}>
              <Text style={styles.btnText}>{t('accept') || 'Accept'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#1e1f1f',
    borderRadius: 12,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
  },
  loadingRow: { paddingVertical: 24, alignItems: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#333',
  },
  subject: { color: '#fff', flex: 1, paddingRight: 8 },
  empty: { color: '#aaa', textAlign: 'center', paddingVertical: 12 },
  list: { maxHeight: 320 },
  search: {
    backgroundColor: '#2a2b2f',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#3a3b3f',
    marginBottom: 10,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    color: '#e5e5ff',
    fontWeight: '700',
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
    paddingLeft: 4,
    marginVertical: 2
  },
  typeRowRounded: {
    borderTopLeftRadius: 44,
    borderBottomLeftRadius: 44,
  },
  typeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  typeLabel: {
    color: '#fff',
  },
  countText: {
    color: '#9aa0a6',
    marginLeft: 8,
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  checkboxBtn: {
    padding: 4,
  },
  secondary: {
    flex: 1,
    backgroundColor: '#555555',
    paddingVertical: 12,
    borderRadius: 6,
  },
  primary: {
    flex: 1,
    backgroundColor: '#8d95fe',
    paddingVertical: 12,
    borderRadius: 6,
  },
  resetSquare: {
    aspectRatio:1,
    backgroundColor: '#ad3838ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});

export default SubjectVisibilityModal;
