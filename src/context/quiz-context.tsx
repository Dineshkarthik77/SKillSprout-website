"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type QuizContextType = {
  resetAssessments: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  // This is a placeholder. In a real app, you'd have state here.
  const [assessments, setAssessments] = useState({}); 

  const resetAssessments = () => {
    console.log("Assessments reset!");
    setAssessments({});
  };

  return (
    <QuizContext.Provider value={{ resetAssessments }}>
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
