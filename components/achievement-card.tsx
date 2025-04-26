interface AchievementCardProps {
  title: string
  description: string
}

const AchievementCard = ({ title, description }: AchievementCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/10 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-start">
        <div className="mr-4 bg-purple-500/20 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default AchievementCard
