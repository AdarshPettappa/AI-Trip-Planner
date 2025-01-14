import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useState, useEffect } from 'react'
import {Input} from '../components/ui/input'
import { AI_Prompt, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '../components/ui/Button';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModel';
import { FcGoogle } from 'react-icons/fc';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
  


function CreateTrip() {
    const [place,setPlace]=useState();

    const [formData,setFormData]=useState([]);
    const [openDialog, setOpenDailog]=useState(false);

    const handleInputChange=(name,value)=>{
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const login=useGoogleLogin({
        onSuccess: (codeResp)=>GetUserProfile(codeResp),
        onError: (error=>console.log(error)),
    })


    const OnGenerateTrip=async()=>{
        const user = localStorage.getItem('user');

        if(!user){
            setOpenDailog(true)
            // toast('error, please login to continue')
            return;
        }


        if (formData?.days>5&&!formData?.budget || !formData?.location || !formData?.people){
            toast('error, please fill all the fields')
            return;
        }
        const FINAL_PROMPT=AI_Prompt
        .replace('{location}',formData?.location?.label)
        .replace('{days}',formData?.days)
        .replace('{people}',formData?.people)
        .replace('{budget}',formData?.budget)
        .replace('{totalDays}',formData?.days)

        console.log(FINAL_PROMPT)

        const result=await chatSession.sendMessage(FINAL_PROMPT)

        console.log(result?.response?.text());

    }

    const GetUserProfile=(tokenInfo)=>{
        console.log(tokenInfo)
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo}`,{
            headers:{
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp)=>{
            console.log(resp);
        })
        .catch((error) => {
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Status:", error.response.status);
            } else {
                console.error("Error Message:", error.message);
            }
        });
    }
    

    useEffect(()=>{
        console.log(formData)
    }, [formData])

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
         <h2 className='font-bold text-3xl'> Tell us your travel preferences </h2>
         <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information, and we'll take care of the rest based on your preferences. </p>
         
         <div className='mt-20 flex flex-col gap-10'>
            <div>
                <h2 className='text-xl my-3 font-medium'> What is your destination of choice? </h2>
                <GooglePlacesAutocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    selectProps={{
                        place,
                        onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
                    }}
                />
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'> How many days are you planning your trip? </h2>
                <Input placeholder={'Ex.3'} type="number"
                    onChange={(e)=>handleInputChange('days',e.target.value)}
                />
            </div>
            <div>
                <h2 className='text-xl my-3 font-medium'> What is your budget? </h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item,index)=>(
                        <div key={index} 
                        onClick={()=>handleInputChange('budget',item.title)}
                        className={`p-4 border cursor-pointer 
                        rounded-lg hover:shadow-lg
                        ${formData?.budget==item.title&&'shadow-lg border-black'}
                        `}>
                            <h2 className='text-4xl'> {item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'> Who do you plan to travel with? </h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item,index)=>(
                        <div key={index}
                        onClick={()=>handleInputChange('people',item.people)} 
                        className={`p-4 border cursor-pointer rounded-lg 
                        hover:shadow-lg
                        ${formData?.people==item.people&&'shadow-lg border-black'}
                        `}>
                            <h2 className='text-4xl'> {item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>
         </div>

         <div className='my-10 justify-end flex'>
            <Button onClick={OnGenerateTrip}> Make the Trip! </Button>
         </div>

         <Dialog open={openDialog}>

         <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    <img src='./logo.svg' />
                    <h2 className='font-bold text-lg mt-7'> Sign in with Google </h2>
                    <p> Please sign in with your google account to continue </p>
                    <Button className='w-full mt-5 flex gap-4 items-center' onClick={login}>
                        <FcGoogle className='h-7 w-7'/>
                        Sign in with Google 
                    </Button>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

    </div>
    


  )
}

export default CreateTrip