import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {

  const { id: paramId } = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [id, setId] = useState('' as string);
  const [image, setImage] = useState('');
  const [sport, setSport] = useState('');
  const [level, setLevel] = useState('');
  const [country, setCountry] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [bio, setBio] = useState('');

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', (await supabase.auth.getUser()).data.user?.id as string)
      .single();

    if (data) {
      setName(data.name);
      setId(data.id);
      setCountry(data.country);
      setSport(data.sport);
      setLevel(data.level);
      setUsername(data.username);
      setBirthday(data.birthday);
      setBio(data.bio);
      setImage(data.url_profile_picture);
    } else {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const age = birthday ? new Date().getFullYear() - new Date(birthday).getFullYear() : 0;


  return (
    <div className="flex py-32 items-center justify-center">
      <ProfileCard name={name} sport={sport} image={image} age={age} level={level} country={country} username={username} id={id} bio={bio} />
    </div>
  )
}
