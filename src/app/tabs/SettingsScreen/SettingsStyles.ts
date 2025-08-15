import { StyleSheet } from 'react-native';

const settingsStyles = StyleSheet.create({
  smallLabel: {
    color: '#ffffffff',
  },
  bgContainer: {
    flex: 1,
    backgroundColor: '#181818',
  },
  container: {
    backgroundColor: '#1e1f1f',
    padding: 16,
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 8,
  },
  groupsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  elementsSpacing: {
    marginTop: 10,
  },
  labelText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentGroups: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  notifications: {
    flexDirection: 'column',
    gap: 10,
    flexWrap: 'wrap',
  },
  notificationsContainer: {
   flexDirection: 'row',
   justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  notificationsMid: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  scrollContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});

export default settingsStyles;
