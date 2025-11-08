const Home = ({ onShowTeachers, onShowStats }) => {
  const savedEvaluations = JSON.parse(localStorage.getItem('evaluations') || '[]')
  const hasEvaluations = savedEvaluations.length > 0

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-2xl p-10 md:p-14 max-w-lg w-full text-center transform transition-all hover:scale-105 border-2 border-indigo-100">
        <div className="text-7xl mb-6 animate-bounce">🎓</div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          نظام تقييم المعلمين
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-2">
          Teacher Evaluation System
        </h2>
        <p className="text-gray-600 mb-8 text-lg md:text-xl">
          ساعدنا في تحسين التعليم من خلال مشاركة تقييمك
        </p>
        <p className="text-gray-500 mb-8 text-base">
          Help us improve education by sharing your feedback
        </p>
        
        <div className="space-y-4">
          <button
            onClick={onShowTeachers}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
          >
            عرض المعلمين / Show Teachers
          </button>
          
          {hasEvaluations && (
            <button
              onClick={onShowStats}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
            >
              عرض الإحصائيات ({savedEvaluations.length}) / View Statistics
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

