import Input from '../components/Input'
import { useEffect, useState } from 'react'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        user_name: "",
        user_bio: ""
    })

    const [initialUserInfo, setInitialUserInfo] = useState({
        user_name: "",
        user_bio: ""
    })

    useEffect(() => {
        getProfileInfo()
    }, [])

    const getProfileInfo = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/users/profile", {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken
                }
            })
            const parseRes = await res.json()
            setUserInfo(parseRes)
            setInitialUserInfo(parseRes)
        } catch (error) {
            
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            console.log(userInfo)
            const res = await fetch("http://localhost:3001/api/users/profile", {
                method: "POST",
                headers: {
                    "content-type" : "application/json",
                    jwtToken: localStorage.jwtToken
                },
                body: JSON.stringify(userInfo)
            })

            if(res.ok) {
                setUserInfo(userInfo)
                setInitialUserInfo(userInfo)
            }
        } catch (error) {
            
        }
    }

    const handleInput = e => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
    }

    const isSaveDisabled = () => {
        return (
            userInfo.user_name === initialUserInfo.user_name &&
            userInfo.user_bio === initialUserInfo.user_bio
        );
    }

    return (
        <form onSubmit={updateProfile} className="m-10 w-1/2">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
              </div>
            <div className="flex flex-col">
                <div className="mt-2">
                    <Input
                        type="text"
                        name="user_name"
                        value={userInfo.user_name}
                        onChange={handleInput}
                    />
                </div>
                <div className='mt-2'>
                    <label htmlFor="user_bio" className="block">
                        Bio
                    </label>
                    <textarea
                        name="user_bio"
                        rows={3}
                        className="py-2 px-3 w-full border border-secondary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        value={userInfo.user_bio}
                        onChange={handleInput}
                    />
                </div>
            </div>
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
                type="submit"
                className={`px-4 py-2 ${isSaveDisabled() ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-primary text-white hover:bg-white hover:text-primary hover:outline-primary'} font-semibold rounded-md transition-all duration-200`}
                disabled={isSaveDisabled()}
            >
                Save
            </button>
          </div>
        </form>
    )
}

export default Profile