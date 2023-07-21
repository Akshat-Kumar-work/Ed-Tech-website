import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImg1 from "../assets/Images/aboutus1.webp"
import BannerImg2 from "../assets/Images/aboutus2.webp"
import BannerImg3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import Stats from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import Footer from '../components/common/footer'

const About = () => {
  return (
    <div>
    <div className=' mt-[100px] text-white w-11/12 max-w-maxContent mx-auto'>

{/* section 1  */}
<section>

    <div>

        <header className=''>
            Driving Innovation in Online Education for a  <HighlightText text={"Bright Future"}/>
            <p>Studynotion is at the forefront of driving innovation in online education, We're passionate about creating a brighter future by offering cutting-edge
            courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
        </header>

        <div className='flex gap-x-3 '>
          <img src={BannerImg1} alt='bannerimg1'/>
          <img src={BannerImg2} alt='bannerimg2'/>
          <img src={BannerImg3} alt='bannerimg3'/>
        </div>

    </div>

</section>

{/* section 2 */}
<section>

  <div>
    <Quote/>
  </div>
</section>

{/* section 3 */}
<section>

  <div className=' flex flex-col'>

    {/* founding story div */}
    <div className=' flex'>

      {/* founding Story left box */}
      <div>

        <h1>
          Our Founding Story
        </h1>
        <p>Our e-learning platform was born out of a shared vision and passion for transforming education.
         It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible,
         flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

         <p>
         As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. 
         We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a
          platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
         </p>

      </div>
      {/* founding Story right box */}
      <div>
        <img src={FoundingStory} alt='foundingstoryimg'/>
      </div>

    </div>
    
    {/* vision and mission div */}
    <div className=' flex'>

        {/* left box */}
        <div>
          <h1>
              Our Vision
          </h1>

          <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. 
          Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines 
          cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>

        {/* right box */}
        <div>
              <h1>
                  Our Mission
              </h1>

              <p>
              our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, 
              where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, 
              and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
        </div>

    </div>

  </div>

</section>

        {/* section 4 */}
        <Stats/>

        {/* section 5 */}
          <section className=' mx-auto flex item-center justify-center gap '>
          <LearningGrid/>
              </section>

          </div>

                {/* footer section */}
                <Footer/>

    </div>
    

    
  )
}

export default About