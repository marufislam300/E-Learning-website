import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface Course {
  _id: string;
  name: string;
  userEmail: string;
}

const SelectCoursePage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchTeacherEmailAndCourses = async () => {
      const storedData = localStorage.getItem('userData')
      if (!storedData) {
        alert('User data not found. Please login again.')
        router.push('/login')
        return
      }
      
      const userData = JSON.parse(storedData)
      const teacherEmail = userData.email
      
      const res = await fetch(`/api/auth/courses?teacherEmail=${teacherEmail}`)
      const teacherCourses = await res.json() as Course[]
      
      setCourses(teacherCourses)
    }

    fetchTeacherEmailAndCourses()
  }, [])

  const handleSelectCourse = async (courseId: string) => {
    setSelectedCourseId(courseId)
    router.push(`/create-quiz/${courseId}`)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: '#99b9ff',
        backgroundImage: `
          radial-gradient(at 31% 26%, hsla(231,61%,91%,1) 0px, transparent 50%),
          radial-gradient(at 25% 53%, hsla(185,63%,91%,1) 0px, transparent 50%),
          radial-gradient(at 56% 18%, hsla(166,63%,91%,1) 0px, transparent 50%),
          radial-gradient(at 0% 16%, hsla(193,100%,15%,1) 0px, transparent 50%),
          radial-gradient(at 15% 68%, hsla(218,63%,91%,1) 0px, transparent 50%),
          radial-gradient(at 53% 49%, hsla(248,63%,91%,1) 0px, transparent 50%),
          radial-gradient(at 96% 6%, hsla(226,75%,66%,1) 0px, transparent 50%);
        `,
        backgroundSize: 'cover'
      }}
    >
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Select a Course</h2>
        {courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition duration-200">
                <button 
                  onClick={() => handleSelectCourse(course._id)} 
                  className="w-full text-left text-lg font-medium text-blue-600 hover:text-blue-800">
                  {course.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No courses found.</p>
        )}
      </div>
    </div>
  )
}

export default SelectCoursePage
