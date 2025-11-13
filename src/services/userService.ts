import api from './api';

export interface Skill {
  _id?: string;
  name: string;
  level?: string;
  category?: string;
}

export interface UserProfile {
  userId: string;
  name?: string;
  email?: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  languages: string[];
  skills: Skill[];
  education?: any[];
  experience?: any[];
  certifications?: any[];
  socialLinks?: Record<string, string>;
  preferences?: any;
  stats?: any;
}

export interface ProfileResponse {
  status: string;
  data: { profile: UserProfile };
}

export interface SkillsResponse {
  status: string;
  data: { skills: Skill[] };
}

export interface StatsResponse {
  status: string;
  data: { stats: any };
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await api.get<ProfileResponse>('/api/users/profile');
    return data.data.profile;
  },

  async updateProfile(payload: Partial<UserProfile>): Promise<UserProfile> {
    const { data } = await api.put<ProfileResponse>('/api/users/profile', payload);
    return data.data.profile;
  },

  async getStats(): Promise<any> {
    const { data } = await api.get<StatsResponse>('/api/users/stats');
    return data.data.stats;
    },

  async addSkill(name: string, level: string = 'intermediate', category?: string): Promise<Skill[]> {
    const { data } = await api.post<SkillsResponse>('/api/users/skills', { name, level, category });
    return data.data.skills;
  },

  async removeSkill(skillId: string): Promise<Skill[]> {
    const { data } = await api.delete<SkillsResponse>(`/api/users/skills/${skillId}`);
    return data.data.skills;
  },
};
