import React, { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [mainNews, setMainNews] = useState([]);
  const [moreNews, setMoreNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentId, setContentId] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
      if(mainNews.length<=0){
        const fetchNews = async () => {
          try {
            const mainNewsResponse = await axios.get('https://newsapi.org/v2/top-headlines', {
              params: {
                country: 'in',
                category: ['health'],
                sortBy: 'popularity',
                apiKey: '9e7f234bd9184b6a8b6f021f6f165065',
                pageSize: '3', // Fetch 3 main news items
              },
            });
    
            const moreNewsResponse = await axios.get('https://newsapi.org/v2/everything', {
              params: {
                q: 'ewaste',
                language: 'en',
                sortBy: 'popularity',
                pageSize: '9',
                title: "ewaste",
                page: 1,
                apiKey: '9e7f234bd9184b6a8b6f021f6f165065',
              },
            });
    
            // Filter out similar news articles from main news
            const filteredMainNews = mainNewsResponse.data.articles.filter(article => {
              return !moreNewsResponse.data.articles.some(otherArticle => otherArticle.title === article.title);
            });
    
            // Filter out similar news articles from more news
            const filteredMoreNews = moreNewsResponse.data.articles.filter(article => {
              return !mainNewsResponse.data.articles.some(otherArticle => otherArticle.title === article.title);
            });
    
            setMainNews(filteredMainNews);
            setMoreNews(filteredMoreNews);        
            setLoading(false);
          } catch (error) {
            setError('Error fetching news. Please try again later.');
            setLoading(false);
          }
        };
    
        fetchNews();
      }
    

    // Fetch main news on an interval
    const interval = setInterval(() => {
      setContentId(prevId => (prevId + 1) % mainNews.length);
    }, 5000);

    return () => clearInterval(interval); // Clear the interval on component unmount

  }, [currentPage, mainNews.length]);

  return (
    <div className="px-6 py-3 ">
      <div id='newsHeader' className='flex w-full justify-between items-center bg-white -mt-3 z-10 fixed   py-5 '>
        <p className='text-3xl hidden md:block font-semibold'>News</p>
        <svg onClick={() => {
          console.log("clicked");
          const sidebar = document.getElementById('sidebar');
          const header = document.getElementById('newsHeader');

          if (sidebar) {
            header.classList.toggle('z-10');

          sidebar.classList.toggle('hidden');
          }
        }}
         className="h-8 w-8 block md:hidden font-semibold text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="16" y2="18" />
        </svg>
        

      </div>
      {loading && (
        <div className="text-center mt-16">
         <div className="bg-gray-100 w-2/3  h-80 p-4 rounded shadow-md">
            <div className="animate-pulse">
              <div className="bg-gray-200 h-52 rounded mb-2"></div>
              <div className="bg-gray-200 h-8 rounded mb-2"></div>
              <div className="bg-gray-200 h-6 rounded mb-2"></div>
            </div>
          </div>
          {/* Placeholder for main news */}
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded shadow-md">
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-32 rounded mb-2"></div>
                  <div className="bg-gray-300 h-8 rounded mb-2"></div>
                  <div className="bg-gray-300 h-8 rounded mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
      {mainNews.length > 0 && (
        <div className='mt-16'>
          <div className='p-5 bg-gray-50'>
            <div className='relative overflow-hidden  h-80 rounded-md'>
              <img className='object-cover w-full h-full' src={mainNews[contentId].urlToImage} alt="News Image" />
              <div className='absolute inset-0 flex items-end'>
                <div className={`bg-gradient-to-b from-transparent to-black p-4`}>
                  <p className="text-white text-3xl font-medium mb-4" style={{ maxHeight: '3.6em', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{mainNews[contentId].title}</p>
                  <p className="text-gray-200 text-sm" style={{ maxHeight: showDetails ? '150px' : '0', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, transition: 'max-height 0.5s ease-in-out' }}>{mainNews[contentId].description}</p>
                </div>
              </div>
              <div className='absolute inset-0' onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => setShowDetails(false)}></div>
            </div>
          </div>
        </div>
      )}

      {moreNews.length > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
             { moreNews.map((news, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <img src={news.urlToImage} alt="News Image" className="w-full h-32 object-cover mb-2 rounded" />
                  <p className="text-gray-800 font-semibold text-lg line-clamp-1 mb-1">{news.title}</p>
                  <p className="text-gray-400 line-clamp-3 text-sm">{news.description}</p>
                  
                </div>
              ))}
            
          </div>
          {/* {!showMore && (
            <div className="mt-4 flex justify-center">
              <button onClick={handleShowMore} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Show More</button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default News;
