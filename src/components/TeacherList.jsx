import { useEffect, useState } from 'react'
import { teachers } from '../data/teachers'

const TeacherList = ({ onSelectTeacher }) => {
  const [teacherStats, setTeacherStats] = useState({})

  useEffect(() => {
    const evaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
    const stats = {}

    teachers.forEach((teacher) => {
      const teacherEvals = evaluations.filter((entry) => entry.teacherId === teacher.id || entry.teacherName === teacher.name || entry.teacher === teacher.name)
      if (teacherEvals.length > 0) {
        const avg = teacherEvals.reduce((sum, e) => sum + parseFloat(e.average), 0) / teacherEvals.length
        stats[teacher.id] = {
          average: avg.toFixed(2),
          count: teacherEvals.length,
        }
      }
    })

    setTeacherStats(stats)
  }, [])

  const getStarRating = (score) => {
    const stars = Math.floor(score)
    const hasHalf = score % 1 >= 0.5
    return { stars, hasHalf }
  }

  const getInitials = (name) => {
    if (!name) return 'T'
    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          اختر معلمًا للتقييم
        </h1>
        <p className="text-xl text-gray-600">
          Select a Teacher to Evaluate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => {
          const stats = teacherStats[teacher.id]
          const starRating = stats ? getStarRating(parseFloat(stats.average)) : null

          return (
            <div
              key={teacher.id}
              className="bg-gradient-to-br from-white via-indigo-50 to-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-indigo-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">
                  {getInitials(teacher.name)}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {teacher.name}
                </h2>
                <p className="text-sm text-indigo-600 font-semibold mb-1">
                  {teacher.roleAr} / {teacher.role}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  الصفوف: {teacher.classes}
                </p>
                {teacher.specialization && (
                  <p className="text-xs text-gray-600 mb-4 bg-white rounded-full px-3 py-1 border border-indigo-100">
                    {teacher.specializationAr || teacher.specialization}
                  </p>
                )}

                {stats && (
                  <div className="mb-4 p-3 bg-white rounded-lg border border-indigo-200 w-full">
                    <div className="text-sm text-gray-600 mb-1">متوسط التقييم / Average</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {[...Array(starRating.stars)].map((_, i) => (
                        <span key={`full-${i}`} className="text-xl text-yellow-400">⭐</span>
                      ))}
                      {starRating.hasHalf && <span className="text-xl text-yellow-400">⭐</span>}
                      {[...Array(5 - starRating.stars - (starRating.hasHalf ? 1 : 0))].map((_, i) => (
                        <span key={`empty-${i}`} className="text-xl text-gray-300">⭐</span>
                      ))}
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">{stats.average}</div>
                    <div className="text-xs text-gray-500 mt-1">{stats.count} تقييمات</div>
                  </div>
                )}

                <button
                  onClick={() => onSelectTeacher(teacher)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full shadow-lg"
                >
                  تقييم / Evaluate
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {Object.keys(teacherStats).length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          لا توجد تقييمات بعد / No evaluations yet
        </div>
      )}
    </div>
  )
}

export default TeacherList

