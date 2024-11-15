import React from 'react'
import ProjectCard from './ProjectCard'

const Project = () => {
  return (
    <div>
        <div className="pt-5 pb-20 bg-[#FEFEFF] flex flex-col items-center">
            <div className="text-part px-10 xl:px-0 flex flex-col items-center">
                {/* <div className=" border border-[#FF9416] w-fit bg-[#f9eee0] text-[#FF9416] px-6 py-2 rounded-full text-sm font-semibold ">Projects</div> */}
                <div className="mt-6 xl:mt-10 font-semibold text-2xl xl:text-5xl xl:w-[60%] text-center text-[#d3d3d4]">WHAT CAN WE <span className='text-black'> DO FOR YOU.</span></div>
                <div className="mt-6 xl:mt-10 text-center xl:w-[50%] text-sm xl:text-lg text-[#737373] ">Discover the innovative tools and functionalities that make VerifiChain the ultimate solution for seamless and efficient Document management.</div>
            </div>
            <div className="project-cards flex max-w-[450px] xl:max-w-none flex-col items-center xl:flex-row space-y-8 xl:space-y-0 xl:justify-between xl:space-x-5 pt-10  px-10">
                <ProjectCard title="Know What Benifits Government has to offer" description="Monitor the exact location and status of your packages at every stage of their journey" imageLink="https://back.3blcdn.com/sites/default/files/styles/ratio_3_2/public/triplepundit/wide/farmers%20in%20india%20use%20gramhal%20chatbot.jpg?h=ac45411d" redirectLink="/scheme-bot"/>
                <ProjectCard title="Learn About Citizen Rights & Bureaucracy" description="Monitor the exact location and status of your packages at every stage of their journey" imageLink="https://k8school.com/?seraph_accel_gci=wp-content%2Fuploads%2F2021%2F05%2FAdobeStock_367295906-1024x536.jpg&n=CklBKFkZ4a9o10qcIRYaQ" redirectLink="/manage"/>
                <ProjectCard title="Get your Documents Verified seemlessly" description="Monitor the exact location and status of your packages at every stage of their journey" imageLink="https://cdn.prod.website-files.com/61436206a95bd10922bde560/65d6229d93a2ff6a5efd04f9_6268086b973db521486ba9bc_kyc%2520kyb%2520use%2520case.png" redirectLink="/verify"/>

            </div>

        </div>
    </div>
  )
}

export default Project