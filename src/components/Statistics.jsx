import { useEffect, useState } from 'react'

const Statistics = ({ onBack }) => {
  const [evaluations, setEvaluations] = useState([])
  const [teacherStats, setTeacherStats] = useState({})

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('evaluations') || '[]')
    setEvaluations(data)

    // Calculate statistics per teacher
    const stats = {}
    const teachers = [...new Set(data.map(e => e.teacher))]

    teachers.forEach(teacher => {
      const teacherEvals = data.filter(e => e.teacher === teacher)
      const averages = teacherEvals.map(e => parseFloat(e.average))
      const totalScore = averages.reduce((sum, avg) => sum + avg, 0)
      const average = totalScore / averages.length
      const totalEvals = teacherEvals.length

      stats[teacher] = {
        average: average.toFixed(2),
        count: totalEvals,
        totalScore: totalScore.toFixed(2),
        evaluations: teacherEvals
      }
    })

    setTeacherStats(stats)
  }, [])

  const getScoreColor = (score) => {
    const avg = parseFloat(score)
    if (avg >= 4) return 'from-green-400 to-emerald-500'
    if (avg >= 3) return 'from-blue-400 to-cyan-500'
    return 'from-orange-400 to-red-500'
  }

  const getStarRating = (score) => {
    const stars = Math.floor(score)
    const hasHalf = score % 1 >= 0.5
    return { stars, hasHalf }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
      >
        ← العودة للصفحة الرئيسية / Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            إحصائيات التقييمات
          </h1>
          <p className="text-xl text-gray-600">
            Evaluation Statistics
          </p>
          <div className="mt-4 text-lg text-gray-700">
            إجمالي التقييمات: <span className="font-bold text-indigo-600">{evaluations.length}</span>
          </div>
        </div>

        {evaluations.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-2xl text-gray-500">لا توجد تقييمات بعد</p>
            <p className="text-lg text-gray-400">No evaluations yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(teacherStats).map(([teacher, stats]) => {
              const starRating = getStarRating(parseFloat(stats.average))
              const percentage = (parseFloat(stats.average) / 5) * 100
              
              return (
                <div
                  key={teacher}
                  className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-6 md:p-8 border-2 border-indigo-200 shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        {teacher}
                      </h2>
                      <div className="text-gray-600">
                        {stats.count} تقييمات / {stats.count} evaluations
                      </div>
                    </div>
                    
                    <div className="text-center md:text-right">
                      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {stats.average}
                      </div>
                      <div className="text-gray-600 mb-2">من 5.0 / Out of 5.0</div>
                      <div className="flex items-center justify-center md:justify-end gap-1">
                        {[...Array(starRating.stars)].map((_, i) => (
                          <span key={i} className="text-2xl text-yellow-400">⭐</span>
                        ))}
                        {starRating.hasHalf && <span className="text-2xl text-yellow-400">⭐</span>}
                        {[...Array(5 - starRating.stars - (starRating.hasHalf ? 1 : 0))].map((_, i) => (
                          <span key={i} className="text-2xl text-gray-300">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${getScoreColor(stats.average)} h-4 rounded-full transition-all duration-1000 flex items-center justify-end pr-2`}
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="text-xs font-bold text-white">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Evaluations */}
                  <div className="border-t border-gray-300 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">آخر التقييمات / Recent Evaluations</h3>
                    <div className="space-y-2">
                      {stats.evaluations.slice(-3).reverse().map((evaluation, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200">
                          <div className="text-sm text-gray-600">
                            {new Date(evaluation.timestamp).toLocaleDateString('ar-EG')}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-indigo-600">{evaluation.average}</span>
                            <span className="text-xs text-gray-500">/ 5.0</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics

