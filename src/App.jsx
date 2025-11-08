import { useState } from 'react'
import Home from './components/Home'
import TeacherList from './components/TeacherList'
import Evaluation from './components/Evaluation'
import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [evaluationData, setEvaluationData] = useState(null)

  const handleShowTeachers = () => {
    setCurrentPage('teachers')
  }

  const handleShowStats = () => {
    setCurrentPage('statistics')
  }

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher)
    setCurrentPage('evaluation')
  }

  const handleSubmitEvaluation = (data) => {
    setEvaluationData(data)
    setCurrentPage('feedback')
    
    // Store in localStorage
    const existingData = JSON.parse(localStorage.getItem('evaluations') || '[]')
    existingData.push({
      teacherId: selectedTeacher?.id || selectedTeacher?.name || selectedTeacher,
      teacherName: selectedTeacher?.name || selectedTeacher,
      role: selectedTeacher?.role || '',
      classes: selectedTeacher?.classes || '',
      ...data,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('evaluations', JSON.stringify(existingData))
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setSelectedTeacher(null)
    setEvaluationData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <Home 
            onShowTeachers={handleShowTeachers} 
            onShowStats={handleShowStats}
          />
        )}
        {currentPage === 'teachers' && (
          <TeacherList onSelectTeacher={handleSelectTeacher} />
        )}
        {currentPage === 'evaluation' && (
          <Evaluation 
            teacher={selectedTeacher} 
            onSubmit={handleSubmitEvaluation}
            onBack={handleBackToHome}
          />
        )}
        {currentPage === 'feedback' && (
          <Feedback 
            teacher={selectedTeacher}
            data={evaluationData}
            onBack={handleBackToHome}
          />
        )}
        {currentPage === 'statistics' && (
          <Statistics onBack={handleBackToHome} />
        )}
      </div>
    </div>
  )
}

export default App

