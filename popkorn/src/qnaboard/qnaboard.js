import React, { useState } from 'react';
import ListForm from '../admin/submenu/modules/ListForm';

function AnswerList({ answers }) {
  return (
    <div>
      <h3>Answers:</h3>
      {answers.map(answer => (
        <div key={answer.id}>
          <p>{answer.content}</p>
        </div>
      ))}
    </div>
  );
}

function QuestionList({ questions, onQuestionClick }) {
  return (
  <div>
  <h2>Questions</h2>
  {questions.map(question => (
  <div key={question.id} onClick={() => onQuestionClick(question.id)}>
  <h3>{question.title}</h3>
  <p>{question.content}</p>
  </div>
  ))}
  </div>
  );
  }

function QuestionForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default function QnaBoard() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionSubmit = (question) => {
    const newQuestion = {
      ...question,
      id: Math.random(), // 임시 ID 생성
      answers: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleQuestionClick = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    setSelectedQuestion(question);
  };

  return (
    <div className="App">
      <QuestionForm onSubmit={handleQuestionSubmit} />
      <QuestionList questions={questions} onQuestionClick={handleQuestionClick} />
      {selectedQuestion && <AnswerList answers={selectedQuestion.answers} />}
      <ListForm/>
    </div>
  );
}
