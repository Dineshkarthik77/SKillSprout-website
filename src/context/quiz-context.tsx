"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TechAssessmentScores = {
  level1: number;
  level2: number;
};

type QuizContextType = {
  techAssessmentScores: TechAssessmentScores;
  setTechAssessmentScore: (level: number, score: number) => void;
  resetAssessments: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const initialScores: TechAssessmentScores = {
  level1: 0,
  level2: 0,
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [techAssessmentScores, setTechAssessmentScores] = useState<TechAssessmentScores>(initialScores); 

  const setTechAssessmentScore = (level: number, score: number) => {
    if (level > 2) return; // We only have 2 levels now
    setTechAssessmentScores(prevScores => ({
      ...prevScores,
      [`level${level}`]: score,
    }));
  };

  const resetAssessments = () => {
    console.log("Assessments reset!");
    setTechAssessmentScores(initialScores);
  };

  return (
    <QuizContext.Provider value={{ techAssessmentScores, setTechAssessmentScore, resetAssessments }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
