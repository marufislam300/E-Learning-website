import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Question {
  title: string;
  options: string[];
  correctAnswer: number;
}

interface User {
  email: string;
  name: string;
}

const CreateQuizPage = () => {
  const router = useRouter()
  const courseId = router.query.courseId as string

  const [quizName, setQuizName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([{ title: '', options: ['', '', '', ''], correctAnswer: -1 }])
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = localStorage.getItem('userData')
        if (!storedData) {
          alert('User data not found. Please login again.')
          router.push('/login')
          return
        }
        
        const parsedUserData = JSON.parse(storedData) as User
        setUserData(parsedUserData)
        const teacherEmail = parsedUserData.email
        
        const res = await fetch(`/api/auth/get-user-name?email=${teacherEmail}`)
        const { name } = await res.json()
        
        setUserName(name)
      } catch (error) {
        console.error('Error fetching user data:', error)
        alert('An error occurred while fetching user data.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (loading || !userName) {
      alert('Please wait while we fetch your data.')
      return
    }

    try {
      const quizData = {
        quizName,
        questions,
        courseId,
        createdBy: userName,
        userEmail: userData?.email || '',
      }

      const response = await fetch(`/api/auth/create-quiz/${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      })

      if (!response.ok) {
        throw new Error('Failed to create quiz')
      }

      const data = await response.json()
      alert('Quiz created successfully!')
      
      router.push('/welcome')
    } catch (error) {
      console.error('Error creating quiz:', error)
      alert('An error occurred while creating the quiz. Please try again.')
    }
  }

  const handleAddQuestion = () => {
    setQuestions(prev => [...prev, { title: '', options: ['', '', '', ''], correctAnswer: -1 }])
  }

  const handleRemoveQuestion = (index: number) => {
    setQuestions(prev => prev.filter((_, i) => i !== index))
  }

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions(prev => 
      prev.map((q, i) => 
        i === index ? { ...q, title: value } : q
      )
    )
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => 
      prev.map((q, i) => 
        i === questionIndex ? 
          { ...q, options: q.options.map((o, j) => j === optionIndex ? value : o) } 
          : q
      )
    )
  }

  const handleCorrectAnswerChange = (index: number, value: number) => {
    setQuestions(prev => 
      prev.map((q, i) => 
        i === index ? { ...q, correctAnswer: value } : q
      )
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Create Quiz for Course: {courseId}
      </h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="quizName" className="block text-gray-700 font-semibold">Quiz Name:</label>
          <input
            type="text"
            id="quizName"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter quiz name"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Question {index + 1}</h3>
            <div className="mb-4">
              <label htmlFor={`question-${index}`} className="block text-gray-700">Question:</label>
              <input
                type="text"
                id={`question-${index}`}
                value={question.title}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
                placeholder="Enter question"
              />
            </div>

            <div>Options:</div>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mt-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                  required
                  className="p-2 border border-gray-300 rounded mr-2 w-full"
                  placeholder={`Option ${optionIndex + 1}`}
                />
                <label className="ml-2 text-gray-600 flex items-center">
                  <input
                    type="radio"
                    checked={question.correctAnswer === optionIndex}
                    onChange={() => handleCorrectAnswerChange(index, optionIndex)}
                    className="mr-1"
                  />
                  Correct Answer
                </label>
              </div>
            ))}

            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="mt-3 text-red-500 hover:text-red-700 text-sm"
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-700 float-right"
        >
          Create Quiz
        </button>
      </form>
    </div>
  )
}

export default CreateQuizPage
