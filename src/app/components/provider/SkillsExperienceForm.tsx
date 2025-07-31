'use client';

import { useState } from 'react';

interface Skill {
  name: string;
  level: string;
  years: number;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface SkillsExperienceProfile {
  skills?: Skill[];
  experience?: number;
  certifications?: Certification[];
  education?: string;
}

interface SkillsExperienceFormProps {
  profile: SkillsExperienceProfile;
  onChange: (updates: Partial<SkillsExperienceProfile>) => void;
}

export default function SkillsExperienceForm({ profile, onChange }: SkillsExperienceFormProps) {
  const [newSkill, setNewSkill] = useState<Skill>({ name: '', level: 'Beginner', years: 0 });
  const [newCertification, setNewCertification] = useState<Certification>({ name: '', issuer: '', date: '' });

  const skills = profile.skills || [];
  const certifications = profile.certifications || [];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const updatedSkills = [...skills, { ...newSkill }];
      onChange({ skills: updatedSkills });
      setNewSkill({ name: '', level: 'Beginner', years: 0 });
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_: Skill, i: number) => i !== index);
    onChange({ skills: updatedSkills });
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim()) {
      const updatedCertifications = [...certifications, { ...newCertification }];
      onChange({ certifications: updatedCertifications });
      setNewCertification({ name: '', issuer: '', date: '' });
    }
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_: Certification, i: number) => i !== index);
    onChange({ certifications: updatedCertifications });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Skills & Experience
        </h3>
        <p className="text-gray-600 mb-6">
          Tell us about your skills, experience, and qualifications.
        </p>
      </div>

      {/* Years of Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={profile.experience || ''}
            onChange={(e) => onChange({ experience: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Background
          </label>
          <input
            type="text"
            value={profile.education || ''}
            onChange={(e) => onChange({ education: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Trade School, Bachelor's Degree"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Skills</h4>
        
        {/* Add New Skill */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Skill name (e.g., Plumbing, Electrical)"
              />
            </div>
            <div>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div className="flex">
              <input
                type="number"
                min="0"
                max="50"
                value={newSkill.years}
                onChange={(e) => setNewSkill(prev => ({ ...prev, years: parseInt(e.target.value) || 0 }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Years"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Skills List */}
        {skills.length > 0 && (
          <div className="space-y-3">
            {skills.map((skill: Skill, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {skill.level} • {skill.years} year{skill.years !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Certifications</h4>
        
        {/* Add New Certification */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                value={newCertification.name}
                onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Certification name"
              />
            </div>
            <div>
              <input
                type="text"
                value={newCertification.issuer}
                onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Issuing organization"
              />
            </div>
            <div>
              <input
                type="date"
                value={newCertification.date}
                onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={addCertification}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Certifications List */}
        {certifications.length > 0 && (
          <div className="space-y-3">
            {certifications.map((cert: Certification, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {cert.issuer} {cert.date && `• ${cert.date}`}
                  </span>
                </div>
                <button
                  onClick={() => removeCertification(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}