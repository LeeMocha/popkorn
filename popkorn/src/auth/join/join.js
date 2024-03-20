import { useState } from 'react';
import Joindetail from './joindetail';
import { JoinNickname } from './joinNickname';
import Ecertification from './ecertification';
import Joincomplete from './joincomplete';

export default function Join(props) {
    const [joindetail, setJoindetail] = useState(1);

    const joinbutton = () => {
        setJoindetail(joindetail + 1);
    };

    const backjoinbutton = () => {
        setJoindetail(joindetail - 1);
    };

    return (
        <>
            {joindetail === 1 ? (
                <h2 className='memberguide'>
                    <div className='joinalert'>
                        <div className='confirmemail'>
                            {props.emailinput} <br />
                        </div>
                        This email is a unregistered email. <br />
                        Do you want to start the sign-up process?
                    </div>
                    <button onClick={joinbutton} className='embtn'>Sign up by this Email</button>
                </h2>
            ) : joindetail === 2 ? (
                <>
                    <Joindetail backjoinbutton={backjoinbutton} joinbutton={joinbutton}/>
                </>
            ) : joindetail === 3 ? (
                <>
                    <JoinNickname backjoinbutton={backjoinbutton} joinbutton={joinbutton}/>
                </>
            ) : joindetail === 4 ? (
                <>
                    <Ecertification emailinput={props.emailinput} backjoinbutton={backjoinbutton} joinbutton={joinbutton}/>
                </>
            ) : joindetail === 5 ? (
                <>
                    <Joincomplete emailinput={props.emailinput} />
                </>
            ) : null}
        </>
    );
}
