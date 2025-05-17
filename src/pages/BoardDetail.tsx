// src/pages/BoardDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const BoardDetail: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Board: {boardId}</h1>
      {/* BoardDetail component or swimlanes will go here */}
      <p>Swim lanes and cards for this board will be displayed here.</p>
    </div>
  );
};

export default BoardDetail;
