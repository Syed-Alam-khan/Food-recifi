import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const App = () => {
  const [Meals, setMeals] = useState([])
  const [area, setArea] = useState("indian");
  const [search, setSearch] = useState("")

  const FetchData = async () => {
    const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    setMeals(data.data.meals)
  }

  useEffect(() => {
    FetchData();
  }, [area])

  const SearchHandle = async (e) => {
    e.preventDefault()
    const data = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    if (data.data.meals) {
      setMeals(data.data.meals)
    } else {
      alert("Not Found")
    }
  }

  return (
    <>
      <header className='p-5 md:px-20 flex items-center gap-2 sm:gap-5 lg:justify-between justify-center  flex-wrap dark:shadow-blue-500 bg-black shadow-md fixed w-full top-0 z-10'>
        <form className="search w-[300px] " onSubmit={SearchHandle} >
          <input type="text" className='w-full text-white border-white dark:text-white dark:border-[1.5px] dark:border-white py-[2px] px-3 border-[1.5px] shadow-md outline-0 rounded-md' placeholder='search here....' onChange={(e) => { setSearch(e.target.value) }} value={search} />
        </form>
        <nav className=' cursor-pointer'>
          <ul className="menu flex justify-center gap-5 flex-wrap cursor-pointer">
            <li><a onClick={() => { setArea("indian") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>Indian</a></li>
            <li><a onClick={() => { setArea("canadian") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>Canadian</a></li>
            <li><a onClick={() => { setArea("american") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>American</a></li>
            <li><a onClick={() => { setArea("thai") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>Thai</a></li>
            <li><a onClick={() => { setArea("British") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>British</a></li>
            <li><a onClick={() => { setArea("Russian") }} className='text-white dark:text-white hover:text-gray-600 font-bold'>Russian</a></li>
          </ul>
        </nav>
      </header>

      <section className='main flex gap-5 flex-wrap p-5 md:px-20 justify-center mt-46 md:mt-30'>
        <AnimatePresence>
          {
            Meals.map((meal) => {
              return (
                <motion.div
                  key={meal.idMeal}
                  className="meal w-[300px] p-2"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={meal.strMealThumb} alt="" className='w-full rounded-md h-[150px] object-cover' />
                  <h1 className='font-bold text-md mt-2'>{meal.strMeal}</h1>
                </motion.div>
              )
            })
          }
        </AnimatePresence>
      </section>
    </>
  )
}

export default App
