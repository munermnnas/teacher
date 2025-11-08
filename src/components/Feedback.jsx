import { useEffect, useRef, useState } from 'react'
import { getAdvice, levelFromScore } from '../data/advice'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const formatScore = (score) => {
  const value = typeof score === 'string' ? parseFloat(score) : score
  return Number.isFinite(value) ? value : 0
}

const StarRating = ({ score, maxScore = 5 }) => {
  const value = formatScore(score)
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 >= 0.5
  const emptyStars = maxScore - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-2xl text-yellow-400">⭐</span>
      ))}
      {hasHalfStar && <span className="text-2xl text-yellow-400">⭐</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-2xl text-gray-300">⭐</span>
      ))}
      <span className="ml-2 text-lg font-bold text-gray-700">{value.toFixed(1)}</span>
    </div>
  )
}

const levelBadge = {
  excellent: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-300', label: 'أداء ممتاز' },
  good: { bg: 'bg-blue-100 text-blue-700 border-blue-300', label: 'أداء قوي' },
  average: { bg: 'bg-amber-100 text-amber-700 border-amber-300', label: 'مستوى متوسط' },
  poor: { bg: 'bg-orange-100 text-orange-700 border-orange-300', label: 'يحتاج تحسين' },
  veryPoor: { bg: 'bg-rose-100 text-rose-700 border-rose-300', label: 'مستوى حرج' },
}

const Feedback = ({ teacher, data, onBack }) => {
  const [animated, setAnimated] = useState(false)
  const reportRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])

  const getFeedbackMessage = (average) => {
    const avg = parseFloat(average)
    if (avg >= 4.5) {
      return {
        message: 'أداء ممتاز! استمر في العمل الرائع',
        messageEn: 'Excellent performance! Keep up the great work.',
        emoji: '🎉',
        color: 'text-green-600',
        bgGradient: 'from-green-400 to-emerald-500',
        borderColor: 'border-green-500',
      }
    } else if (avg >= 4) {
      return {
        message: 'أداء جيد جداً! استمر في الحفاظ على جودتك',
        messageEn: 'Very good! Continue maintaining your quality.',
        emoji: '🌟',
        color: 'text-green-600',
        bgGradient: 'from-green-300 to-teal-400',
        borderColor: 'border-green-400',
      }
    } else if (avg >= 3) {
      return {
        message: 'أداء جيد، لكن هناك مجال للتحسين',
        messageEn: 'Good, but there\'s room for improvement.',
        emoji: '👍',
        color: 'text-blue-600',
        bgGradient: 'from-blue-300 to-cyan-400',
        borderColor: 'border-blue-400',
      }
    } else if (avg >= 2) {
      return {
        message: 'يحتاج إلى تحسين. فكر في مراجعة طرق التدريس',
        messageEn: 'Needs improvement. Consider reviewing teaching methods.',
        emoji: '📝',
        color: 'text-orange-600',
        bgGradient: 'from-orange-300 to-amber-400',
        borderColor: 'border-orange-400',
      }
    } else {
      return {
        message: 'غير مرضٍ. يحتاج تحسين جدي',
        messageEn: 'Unsatisfactory. Serious improvement needed.',
        emoji: '⚠️',
        color: 'text-red-600',
        bgGradient: 'from-red-300 to-pink-400',
        borderColor: 'border-red-400',
      }
    }
  }

  const overallAverage = formatScore(data?.average)
  const feedback = getFeedbackMessage(overallAverage)
  const percentage = (overallAverage / 5) * 100
  const categorySummaries = data?.categorySummaries || []
  const totalAnswered = data?.totalAnswered ?? data?.totalQuestions ?? categorySummaries.reduce((sum, cat) => sum + (cat.answered || cat.questions.length), 0)
  const maxQuestions = data?.maxQuestions ?? categorySummaries.reduce((sum, cat) => sum + (cat.questions?.length || cat.answered || 0), 0)
  const totalScore = data?.totalScore ?? categorySummaries.reduce((sum, cat) => sum + (cat.total || 0), 0)

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
    })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgProps = pdf.getImageProperties(imgData)
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    const teacherName = typeof teacher === 'string' ? teacher : teacher?.name
    const safeName = teacherName ? teacherName.replace(/\s+/g, '_') : 'teacher'
    pdf.save(`${safeName}_evaluation.pdf`)
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div
        ref={reportRef}
        className={`bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 ${animated ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        {/* Header with gradient */}
        <div className={`bg-gradient-to-r ${feedback.bgGradient} rounded-2xl p-8 mb-8 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white opacity-10"></div>
          <div className="relative z-10">
            <div className="text-8xl mb-4 animate-bounce">{feedback.emoji}</div>
            <h2 className="text-4xl font-bold mb-4">
              شكراً لك على تقييمك!
            </h2>
            <p className="text-xl mb-2 opacity-95">
              المعلم: <span className="font-bold text-2xl">{teacher}</span>
            </p>
          </div>
        </div>

        {/* Main Score Card */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-indigo-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">النقاط الإجمالية / Total Score</h3>
          
          {/* Large Score Display */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-indigo-600 mb-2">{overallAverage.toFixed(2)}</div>
              <div className="text-xl text-gray-600">من 5.0 / Out of 5.0</div>
            </div>
            <div className="border-l-2 border-gray-300 h-20 hidden md:block"></div>
            <div>
              <StarRating score={overallAverage} />
              <div className="mt-4 text-lg text-gray-700">
                النقاط الكلية: <span className="font-bold text-indigo-600">{totalScore}</span> / <span className="text-gray-500">{totalAnswered * 5}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
            <div 
              className={`bg-gradient-to-r ${feedback.bgGradient} h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-center text-white font-bold text-sm`}
              style={{ width: `${animated ? percentage : 0}%` }}
            >
              {percentage.toFixed(0)}%
            </div>
          </div>

          {/* Feedback Message */}
          <div className={`${feedback.color} text-2xl font-bold mt-6 p-6 bg-white rounded-xl border-2 ${feedback.borderColor} shadow-lg`}>
            <div className="mb-2">{feedback.message}</div>
            <div className="text-lg text-gray-600">{feedback.messageEn}</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Detailed Scores:
          </h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            تم تقييم <span className="font-semibold text-indigo-600">{totalAnswered}</span> عنصر/عنصرًا من أصل {maxQuestions || totalAnswered}.
          </p>
          <div className="space-y-2 text-left max-w-md mx-auto">
            {categorySummaries.length > 0 ? categorySummaries.map((category) => (
              <div key={category.id} className="flex justify-between items-center">
                <span className="text-gray-600">{category.titleAr}</span>
                <span className="font-semibold text-indigo-600">{category.average.toFixed(2)} / 5</span>
              </div>
            )) : (
              <p className="text-sm text-gray-500 text-center">
                لم يتم تقديم تقييمات تفصيلية بعد.
              </p>
            )}
            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Score:</span>
              <span className="font-bold text-indigo-600">{totalScore} / {totalAnswered * 5}</span>
            </div>
          </div>
        </div>

        {/* Detailed Scores with AI Analysis */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 mb-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🤖</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              تحليل ذكي وتوصيات / AI Analysis & Recommendations
            </h3>
            <p className="text-gray-600 text-sm">
              بناءً على نتائج التقييم التفصيلية في كل محور
            </p>
          </div>

          <div className="space-y-8">
            {categorySummaries.length > 0 ? categorySummaries.map((category) => {
              const categoryLevel = levelFromScore(category.average)
              const badge = levelBadge[categoryLevel]
              return (
                <section key={category.id} className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden">
                  <header className={`bg-gradient-to-r ${category.accent} px-6 py-5 text-left text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>
                    <div>
                      <div className="text-3xl">{category.icon}</div>
                      <h4 className="text-2xl font-bold">
                        {category.titleAr}
                      </h4>
                      <p className="text-sm opacity-85">{category.title}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{category.average.toFixed(2)}</div>
                        <div className="text-xs uppercase tracking-wider">Average</div>
                      </div>
                      <StarRating score={category.average} />
                    </div>
                  </header>

                  <div className="px-6 py-6 space-y-6">
                    {category.questions.map((question, idx) => {
                      const advice = getAdvice(category.id, question.score)
                      const scoreValue = formatScore(question.score)
                      const scorePercent = (scoreValue / 5) * 100
                      const level = levelFromScore(scoreValue)
                      const badgeStyles = levelBadge[level]

                      return (
                        <div key={question.id} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div className="flex items-start gap-3">
                              <span className="text-indigo-600 font-semibold text-xl">{idx + 1}.</span>
                              <div>
                                <h5 className="text-lg font-semibold text-gray-800 leading-relaxed">
                                  {question.question}
                                </h5>
                                <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full border text-xs font-semibold ${badgeStyles.bg} ${badgeStyles.text} ${badgeStyles.border}`}>
                                  <span>المستوى:</span>
                                  {badgeStyles.label}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-indigo-600">{scoreValue.toFixed(1)}</div>
                              <div className="text-xs text-gray-500">/ 5.0</div>
                            </div>
                          </div>

                          <div className="mb-4 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r ${category.accent} h-2 rounded-full transition-all duration-700`}
                              style={{ width: `${animated ? scorePercent : 0}%` }}
                            ></div>
                          </div>

                          {advice && (
                            <div className="space-y-4">
                              <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
                                <div className="flex items-start gap-2">
                                  <span className="text-xl">📊</span>
                                  <div>
                                    <p className="font-semibold text-gray-800 mb-1">التحليل / Analysis</p>
                                    <p className="text-gray-700 mb-1">{advice.analysisAr || advice.titleAr}</p>
                                    <p className="text-sm text-gray-600">{advice.analysisEn || advice.titleEn}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                                <div className="flex items-start gap-2">
                                  <span className="text-xl">💡</span>
                                  <div>
                                    <p className="font-semibold text-gray-800 mb-3">نصائح مخصصة / Tailored Tips</p>
                                    <ul className="space-y-2">
                                      {advice.tipsAr ? advice.tipsAr.map((tip, tipIdx) => (
                                        <li key={tipIdx} className="text-sm text-gray-700">
                                          <span className="text-green-500 font-bold mr-2">●</span>
                                          {tip}
                                          {advice.tipsEn?.[tipIdx] && (
                                            <div className="text-xs text-gray-500 mt-1 ml-4">{advice.tipsEn[tipIdx]}</div>
                                          )}
                                        </li>
                                      )) : null}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            }) : (
              <div className="text-center text-gray-500">
                لا توجد بيانات تفصيلية لعرض التحليل.
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
          >
            العودة للصفحة الرئيسية / Back to Home
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
          >
            تحميل التقرير كملف PDF / Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Feedback

