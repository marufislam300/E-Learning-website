// pages/course/[id].tsx

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';

interface Course {
  _id: string;
  name: string;
  price: number;
  thumbnail: string;
  userEmail: string;
  videos: Array<{ title: string; url: string }>
}

const CourseDetailsPage = () => {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/course/${router.query.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        alert('An error occurred while fetching course details.');
      }
    };

    fetchCourseDetails();
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.name}</h1>
          <p className="text-lg text-gray-600 mb-4">Price: ${course.price}</p>

          {/* Display the selected video if any */}
          {selectedVideo && (
            <div className="mb-6">
              <ReactPlayer 
                url={selectedVideo} 
                controls 
                width="100%" 
                height="400px" 
              />
            </div>
          )}

          <h2 className="text-xl font-semibold mb-4 text-gray-700">Course Videos:</h2>
          <ul className="space-y-3">
            {course.videos.map((video, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedVideo(video.url)}
                  className="block bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 rounded-lg p-3 w-full text-left"
                >
                  {video.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
