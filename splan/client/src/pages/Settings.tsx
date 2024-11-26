import { Button, Card, ToggleSwitch } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function Settings() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    const fetchId = async () => {
        const userId = (await supabase.auth.getUser()).data.user?.id;
        setId(userId as string);

        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error(error);
        } else {
            setName(data.name);
            setUsername(data.username);
            setImage(data.url_profile_picture);
        }
    }

    const HandleChange1 = async () => {
        const { data, error } = await supabase
            .from('profile')
            .update({ is_public: !checked1 })
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            setChecked1(!checked1);
        }
    }

    const HandleChange2 = async () => {
        const { data, error } = await supabase
            .from('profile')
            .update({ accept_invite: !checked2 })
            .eq('id', id);

        if (error) {
            console.error(error);
        } else {
            setChecked2(!checked2);
        }
    }

    useEffect(() => {
        fetchId()
    }, [])

    return (
        <div className='py-32 mx-8 lg:mx-32 dark:text-white'>
            <h2 className='mb-6 text-xl font-bold'>Modify profile</h2>

            <Card>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4'>
                        <img src={image} alt="profile_picture" className='w-16 h-16 p-1 rounded-full border dark:border-gray-200' />
                        <div>
                        <p className='mb-2 font-bold dark:text-white'>{name}</p>
                        <p className='mb-2 text-gray-600 font-thin dark:text-white'>@{username}</p>
                        </div>
                    </div>

                    <Link to={`/editprofile/${id}`}><Button color='success'>Edit profile</Button></Link>
                </div>
            </Card>
            <h2 className='mb-6 mt-6 text-xl font-bold'>Privacy settings</h2>
            <Card>
                <div className='flex justify-between mb-2 '>
                    <p className='text-gray-700 font-semibold dark:text-white'>Set profile to public</p>
                    <ToggleSwitch checked={checked1} sizing='sm' color='green' className='' label={checked1 ? "True" : "False"} onChange={HandleChange1} />
                </div>
                <div className='flex justify-between mb-2 '>
                    <p className='text-gray-700 font-semibold dark:text-white'>Accept invite from other users</p>
                    <ToggleSwitch checked={checked2} sizing='sm' color='green' label={checked2 ? "True" : "False"} onChange={HandleChange2} />
                </div>
            </Card>
        </div>
    )
}
