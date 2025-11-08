import { useMemo, useState } from 'react'
import { categories, ratingOptions, totalQuestions } from '../data/categories'

const Evaluation = ({ teacher, onSubmit, onBack }) => {
  const [ratings, setRatings] = useState({})

  const handleRatingChange = (questionKey, value) => {
    setRatings((prev) => ({
      ...prev,
      [questionKey]: value,
    }))
  }

  const answeredCount = Object.keys(ratings).length
  const progress = (answeredCount / totalQuestions) * 100

  const categoryProgress = useMemo(() => {
    return categories.map((category) => {
      const answers = category.questions
        .map((_, index) => ratings[`${category.id}-${index + 1}`])
        .filter((value) => typeof value === 'number')
      return {
        id: category.id,
        total: category.questions.length,
        answered: answers.length,
        progress: (answers.length / category.questions.length) * 100,
      }
    })
  }, [ratings])

  const handleSubmit = () => {
    if (answeredCount === 0) {
      alert('يرجى تقييم عنصر واحد على الأقل قبل الإرسال / Please rate at least one item before submitting.')
      return
    }

    const scores = Object.values(ratings)
    const totalScore = scores.reduce((sum, value) => sum + value, 0)
    const average = scores.length > 0 ? totalScore / scores.length : 0

    // Prepare category summaries for feedback page (only categories with answered questions)
    const categorySummaries = categories
      .map((category) => {
        const questionDetails = category.questions.map((question, index) => {
          const key = `${category.id}-${index + 1}`
          const score = ratings[key]
          return {
            id: key,
            question,
            score,
          }
        })

        const answeredQuestions = questionDetails.filter((item) => typeof item.score === 'number')
        if (answeredQuestions.length === 0) {
          return null
        }

        const catScores = answeredQuestions.map((item) => item.score)
        const catTotal = catScores.reduce((sum, value) => sum + value, 0)
        const catAverage = catTotal / answeredQuestions.length

        return {
          id: category.id,
          title: category.title,
          titleAr: category.titleAr,
          gradient: category.gradient,
          accent: category.accent,
          icon: category.icon,
          questions: answeredQuestions,
          total: catTotal,
          average: catAverage,
          answered: answeredQuestions.length,
        }
      })
      .filter(Boolean)

    onSubmit({
      ratings,
      categorySummaries,
      average: average.toFixed(2),
      totalScore,
      totalAnswered: answeredCount,
      maxQuestions: totalQuestions,
      overallProgress: progress,
    })
  }

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <button
        onClick={onBack}
        className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
      >
        ← العودة للصفحة الرئيسية / Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 mb-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">
              تقييم: {teacher?.name || 'معلم'}
            </h1>
            <p className="text-lg opacity-95 mb-1">
              {teacher?.roleAr ? `${teacher.roleAr}` : ''} {teacher?.role ? `/ ${teacher.role}` : ''}
            </p>
            {teacher?.classes && (
              <p className="text-sm opacity-80 mb-2">الفصول: {teacher.classes}</p>
            )}
            <p className="text-lg opacity-95">
              يرجى تقديم تقييمك الصادق أدناه / Please provide your honest feedback below
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-10 space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                التقدم الكلي: {answeredCount} / {totalQuestions}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {categoryProgress.map((catProgress) => {
              const category = categories.find((c) => c.id === catProgress.id)
              return (
                <div key={catProgress.id} className="bg-gradient-to-r from-gray-50 to-white border border-indigo-100 rounded-xl px-4 py-3">
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.titleAr}</span>
                    </div>
                    <span>{catProgress.answered}/{catProgress.total}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${category.accent} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${catProgress.progress}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-10">
          {categories.map((category, categoryIndex) => (
            <section
              key={category.id}
              className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-6 md:p-8 border-2 border-indigo-100 shadow-lg`}
            >
              <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {categoryIndex + 1}. {category.titleAr}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600">{category.title}</p>
                </div>
                <div className="text-sm text-gray-500 font-semibold bg-white rounded-full px-4 py-1 border border-indigo-200">
                  {category.questions.length} أسئلة / Questions
                </div>
              </header>

              <div className="space-y-6">
                {category.questions.map((question, index) => {
                  const questionKey = `${category.id}-${index + 1}`
                  const selectedValue = ratings[questionKey]
                  return (
                    <div
                      key={questionKey}
                      className={`bg-white rounded-xl p-5 md:p-6 border-2 transition-all duration-300 ${
                        selectedValue ? 'border-indigo-400 shadow-xl' : 'border-transparent shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {question}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
                        {ratingOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform ${
                              selectedValue === option.value
                                ? `${option.borderColor} bg-gradient-to-br ${option.color} text-white scale-105 shadow-xl`
                                : 'border-gray-300 bg-white hover:border-indigo-400 hover:shadow-md hover:scale-105'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${questionKey}`}
                              value={option.value}
                              checked={selectedValue === option.value}
                              onChange={() => handleRatingChange(questionKey, option.value)}
                              className="hidden"
                            />
                            <span className="text-3xl mb-2">{option.emoji}</span>
                            <span className={`text-sm font-bold mb-1 ${
                              selectedValue === option.value ? 'text-white' : 'text-gray-700'
                            }`}>
                              {option.labelAr}
                            </span>
                            <span className={`text-xs ${
                              selectedValue === option.value ? 'text-white opacity-90' : 'text-gray-500'
                            }`}>
                              {option.label}
                            </span>
                            <span className={`text-xs font-bold mt-1 ${
                              selectedValue === option.value ? 'text-white' : 'text-indigo-600'
                            }`}>
                              {option.value} نقاط
                            </span>
                            {selectedValue === option.value && (
                              <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
                                <span className="text-green-500 text-lg">✓</span>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            className={`py-4 px-10 rounded-xl font-bold text-lg transition-all duration-300 transform w-full md:w-auto ${
              answeredCount > 0
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-105 active:scale-95 shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={answeredCount === 0}
          >
            {answeredCount > 0 ? (
              answeredCount === totalQuestions
                ? 'إرسال التقييم / Submit Evaluation ✓'
                : `إرسال التقييم (تمت الإجابة على ${answeredCount} من ${totalQuestions})`
            ) : (
              'ابدأ بالإجابة ثم أعد المحاولة'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Evaluation

