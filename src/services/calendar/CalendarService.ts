import apiFetch from '../api';
import { useSettingsStore } from '../../store/settingsStore';

interface ExamInterface {
  title: string;
  description: string;
  date: string;
  examType: string;
  generalGroups: string[];
  subgroups: string[];
}

type ExamResponse = ExamInterface[];

export async function getExamsByGroup(): Promise<ExamResponse> {
  const groups = useSettingsStore.getState().groups;
  const slicedGroup = groups.dean?.slice(0, -1);
  return apiFetch<ExamResponse>(`exams/by-groups`, {
    query: { generalGroups: slicedGroup },
  });
}
