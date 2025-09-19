import apiFetch from '../api';
import { useSettingsStore } from '../../store/settingsStore';

interface ExamInterface {
  title: string;
  description: string;
  date: string;
  examType: string;
  generalGroups: string[];
  subgroups: string[];
  examId?: number;
}

interface ExamType {
  examTypeId: number;
  name: string;
}

type ExamResponse = ExamInterface[];
export type ExamTypes = ExamType[];

export async function getExamsByGroup(): Promise<ExamResponse> {
  const group = useSettingsStore.getState().groups.dean;
  return apiFetch<ExamResponse>(`exams/by-groups`, {
    query: { generalGroups: group },
  });
}

export async function createExams(exams: ExamInterface): Promise<void> {
  try {
    const response = await apiFetch<ExamResponse>('exams', {
      method: 'POST',
      body: JSON.stringify(exams),
    });

    console.log('Backend response:', response);
  } catch (error) {
    console.error('Error creating exam:', error);
  }
}
export async function deleteExam(id: number): Promise<void> {
  try {
    await apiFetch(`exams/${id}`, {
      method: 'DELETE',
    });
    console.log(`Exam ${id} deleted`);
  } catch (error) {
    console.error('Error deleting exam:', error);
  }
}

export async function updateExams(exams: ExamInterface): Promise<void> {
  try {
    const response = await apiFetch<ExamResponse>('exams', {
      method: 'PUT',
      body: JSON.stringify(exams),
    });

    console.log('Backend response:', response);
  } catch (error) {
    console.error('Error creating exam:', error);
  }
}

export async function getExamTypes(): Promise<ExamTypes> {
  const examResponse = await apiFetch<ExamTypes>(`exams/exam-types`);
  return examResponse;
}
