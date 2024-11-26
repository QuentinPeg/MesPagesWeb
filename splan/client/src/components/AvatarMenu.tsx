import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-hot-toast'
import { Dropdown, Avatar } from 'flowbite-react';

export default function AvatarMenu() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('' as string);
    const [image, setImage] = useState('');

    const redirect = useNavigate()

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error('An error occured while signing out')
            return
        }
        toast.success('User signed out successfully')
        redirect('/login')

    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = (await supabase.auth.getUser()).data.user?.id as string;

            const { data, error } = await supabase
                .from('profile')
                .select('name, email, url_profile_picture')
                .eq('id', user)
                .single()


            if (error) {
                console.error('Error:', error);
                toast.error('User profile not found');

            }
            if (data) {
                setName(data.name);
                setEmail(data.email);
                setImage(data.url_profile_picture);
                setId(user);
            }



        };

        fetchUserProfile();
    }, []);

    return (
        <div >
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt="User settings" img={image} rounded bordered className='border rounded-full dark:border-gray-600' />
                }
            >


                <Dropdown.Header>
                    <span className="block text-sm">{name}</span>
                    <span className="block truncate text-sm font-medium">{email}</span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <Link to={`/profile/${id}`} >Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/settings" >Settings</Link>
                </Dropdown.Item>
                <Dropdown.Item>Message</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={signOut} className='bg-red-700 hover:bg-red-600 text-white'>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
}

