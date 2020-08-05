import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Modal, Button, Row, Col, Container, Navbar, Form} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCircle , faDotCircle, faCog, faInfo, faPaperclip, faImage, faSmile} from '@fortawesome/free-solid-svg-icons'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import useSound from 'use-sound';
 
import boopSfx from './sounds/1111.wav';


import io from 'socket.io-client';

const options = {
  transports: ["websocket"]
}
let socket = io('https://striveschool.herokuapp.com/', options)


function App() {
  const customIcons = {
    categories: {
      recent: () => <img src='https://github.githubassets.com/images/icons/emoji/octocat.png' />,
      foods: () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0l6.084 24H8L1.916 0zM21 5h-4l-1-4H4l3 12h3l1 4h13L21 5zM6.563 3h7.875l2 8H8.563l-2-8zm8.832 10l-2.856 1.904L12.063 13h3.332zM19 13l-1.5-6h1.938l2 8H16l3-2z"/></svg>,
      people: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M3 2l10 6-10 6z"></path></svg>
    }
  }
  const [modal, setModal] = useState(true)
  const [username, setUsername] = useState('')
  const [tempUser, setTempUser] = useState('')
  const [messages, setMessages] = useState([])
  const [to, setTo] = useState('')
  const [text, setText] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    console.log('smth happened')
    socket.on('chatmessage', (chatmessage) => {
      setMessages((messages) => messages.concat(chatmessage))
    })
  }, [socket])



  const handleClose = () => {
    setModal(false)
  }
  const saveUser = () => {
    socket.emit("setUsername", {
      username: tempUser
    })
    setUsername(tempUser)
    setModal(false)

  }

  const send = (e) => {
    e.preventDefault()
    socket.emit("chatmessage", {
      to: to,
      text: text
    })
    setMessages((messages => messages.concat({
      from: username,
      msg: text
    })))
    setText('')
  }
  const [play] = useSound(boopSfx);

  return (
    <div className="App">

<div className='row' style={{backgroundColor: '#293E4A'}}>  
         <div className='container'>
         <Navbar className='navbar-linked' variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/600px-Linkedin.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top mr-3"
            />
     LinkedIn Chat
    </Navbar.Brand>
        </Navbar>
         </div>
      </div>

      <div className='row no-gutters' style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
      
      
      <div className='col col-lg-3 col-sm-12' style={{ overflow: 'scroll', height:'90vh', padding: '5px', margin: '3px', border: '1px solid #CECFD2'}}>
     
     <ul className='list-unstyled pt-3' >
       <li>
      <input autoComplete="off" 
                 
                 type='text' 
                 style={{ flex: "0 0 1", outline: 0, paddingLeft: '20px', borderRadius: '50px', border: '1px solid #CECFD2', width: '80%'}} 
                 value={to} 
                 className='search'
                 onChange={(e) => setTo(e.currentTarget.value)} 
                 placeholder='Search...' />
     </li>


     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '40px auto 20px'}}>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQH2ZpNTBJ0m0w/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=BVYN14q3UoE5y0p4TlilG_pff7mhlWL6Mx0xOgsAkJU'/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
            <small className='font-name'>Emmanuel</small>
          <small  style={{letterSpacing: '2px'}}>Online</small>
            </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>

     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
      <img className='img mr-4' src='     https://media-exp1.licdn.com/dms/image/C4E03AQHbwk5fnwxJzg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=cYXFtdZCLXu2TSSvgywqo1KffeRu9ZWFLs5ToOIC9B4'/>
      <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Klevin</small>
       <small  style={{letterSpacing: '2px'}}>Online</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li  className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQEhXHiVnQYhfA/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=9b9I4QpWGD7L_dcdjRP6hnCXaC8SZ7uoyErPD-umc8w'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Arbiona</small>
       <small  style={{letterSpacing: '2px'}}>Offline</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
     
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
       <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4E03AQFv0SNcfHQH8A/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=ikZm7WVzD8N6pp_Mn6z3dbkZDWPFYAW4xxCvulT4NW4'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Ubeyt</small>
       <small  style={{letterSpacing: '2px'}}>Online</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQE6n7Iem46vpg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=il7Htnldai05gXxe1mFIAAnQfRbG2B05RuNqXZ5RvZ4'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Ervins</small>
       <small  style={{letterSpacing: '2px'}}>Offline</small>
       </div>
       </div> 
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
   
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4D03AQFSzZk5YOd2lg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=POCaCd3_ddOtHZ_p23-t7LVLb8ZlngJbcrFiuOKGYaw'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Nathalie</small>
       <small  style={{letterSpacing: '2px'}}>Offline</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQEmKU0TgsZoSA/profile-displayphoto-shrink_400_400/0?e=1602115200&v=beta&t=2mofxHBpy9KbxQKHivhcKbQcKktfyY6a6OUPXPPXom0'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Diego</small>
       <small  style={{letterSpacing: '2px'}}>Offline</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
    
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
       <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4E03AQF2F_Kj1ThAqA/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=TanyyO1QsDUcK0ugOZsQFjBLWYPngCqwvhVEiDHFADU
'/>
      <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Marigona</small>
       <small  style={{letterSpacing: '2px'}}>Online</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4D03AQFWqJ4Tsv-V_g/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=iON6M7NKjVWzJHta8sQw2PXykR6oWMVjyDRY6Vf1Zyo'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Alina</small>
       <small  style={{letterSpacing: '2px'}}>Online</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div style={{display: 'flex', justifyContent: 'flex-start', alignItems:'center', textAlign: 'left'}}>
       <img className='img mr-4' src=' https://ca.slack-edge.com/TJNQP8XCG-U010MP9GNAX-0af0ddad44ba-512'/>
       <div style={{display: 'flex', flexDirection: 'column'}}>

       <small className='font-name'>Detart</small>
       <small  style={{letterSpacing: '2px'}}>Offline</small>
       </div>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
       
     </li>


      </ul>

      </div>



      <div className='col col-lg-6 col-sm-12' style={{background: '#F5F4F7', position: 'relative', height:'90vh', margin: '3px', border: '1px solid #CECFD2'}}>

     <div style={{
            margin: '0 auto',
            position: 'absolute', 
            top: '0',
            width: "100%",
            display: "flex",
            justifyContent: 'space-between',
            padding: '20px 30px',
            background: '#fff',
            borderBottom: '1px solid #CECFD2'
            

          }}>
             {/* {message.from} == 'Emmanuel' ?
             return (
             <img className='img mr-1' src='https://media-exp1.licdn.com/dms/image/C5603AQH2ZpNTBJ0m0w/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=BVYN14q3UoE5y0p4TlilG_pff7mhlWL6Mx0xOgsAkJU'/>
             ) : {message.from} == 'Ksysha' ?
             return (
             <img className='img mr-1' src='https://media-exp1.licdn.com/dms/image/C4E03AQEc2diO-PX-zw/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=B2humeGo9ebxMdUGUE4aZ1XKTCrAcWGAdDKV76WE4mo'/>
             )
           } */}

       <h6>{to}
       { to ? <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} /> : '' }
       </h6> 
       <div>
       <FontAwesomeIcon icon={faCog} style={{color: '#838383'}} />
       <FontAwesomeIcon icon={faInfo} style={{color: '#838383', marginLeft: '20px'}} />
       </div>
     </div>
      <ul style={{background: '#F5F4F7',  height:'88%', listStyle: "none", padding: "70px", borderBottom: '1px solid #CECFD2'} }>

      {messages.map(message => {
          return (
            message.from === username ? (
              <li  style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center', marginTop:'15px'}}>
             
              <small style='shadow' style={{ backgroundColor : '#4b7efc', padding: '10px 20px', width: '30%', borderRadius: '20px', color: '#fff'}}> {message.msg}</small>
              <strong className='text-muted ml-3' style={{fontSize: '10px'}}> me </strong>
           </li>
            ) :
            (
              <li  style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center', marginTop:'15px'}}>
             
              <small style='shadow' style={{ backgroundColor : '#fff', padding: '10px 20px', width: '30%', borderRadius: '20px', color: '#000'}}> {message.msg}</small>
              <strong className='text-muted ml-3' style={{fontSize: '10px'}}>  {message.from}</strong>
           </li>
            )
          
           
   )

  })}


  
</ul>




<div>


        <form
          id="chat"
          onSubmit={send}
          style={{
            margin: '0 auto',
            position: 'absolute', 
            bottom: '0',
            width: "100%",
            display: "flex",
            alignItems: 'center',
            padding: "10px 30px",
            

          }}
        >
      

          <input
            autoComplete="off"
            type='text' 
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
            style={{position: 'relative', flex: "1 0 0",  padding: '15px 20px', borderRadius: '50px', border: 'none', background: '#DEE4E6'}}
           className='outline-none'
            placeholder='Your message...' 
          />
          <div style={{position:'absolute', right: '120px'}}>

          {showPicker && <Picker icons={customIcons} style={{bottom:' 40px', position: 'absolute', right:'100px'}} onClick={(emoji) => {setText(emoji.native)} }/> }
      
       
          <FontAwesomeIcon onClick={() => setShowPicker(!showPicker)} icon={faSmile} style={{ marginRight: '10px', color: '#838383' }}/>
          <FontAwesomeIcon icon={faImage} style={{ marginRight: '10px', color: '#838383' }}/>
          <FontAwesomeIcon icon={faPaperclip} style={{ color: '#838383' }} />
          </div> 
          <Button type="send" className="btn-send outline-none" >
             <FontAwesomeIcon icon={faPaperPlane}  onClick={send} onClick={play} style={{color: '#fff', fontSize: '35px', marginLeft: '5px', backgroundColor: '#4b7efc', padding: '10px', borderRadius: '50%' }}/>
          </Button>
        </form>
        </div>

        
        </div>
        <div className='col col-lg-2 col-sm-12' style={{padding: '20px', height:'90vh', margin: '3px', border: '1px solid #CECFD2', display: 'flex', flexDirection:'column', justifyContent: 'space-between'}}>
        <img style={{width: '100%', border: '2px solid #CECFD2' }} src='https://static-exp1.licdn.com/scds/common/u/images/promo/ads/li_evergreen_jobs_ad_300x250_v1.jpg'/>
          <ul className='list-unstyled' style={{color: 'grey', textAlign: 'left', fontSize: '12px' }}>
            <li>About</li>
            <li>Help Center </li>
            <li>Privacy & Terms</li>
            <li>Accessibility</li>
            <li>Services</li>
            <li>Get the LinkedIn app</li>
            <li>More...</li>
            <li className='mt-2'>
            <img style={{width:'50px'}} src='https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2003%E2%80%932011.png'/>
            <small> LinkedIn Corporation © 2020</small>
          </li>
          </ul>
        
       </div>
        </div>
        {/* <Row>

          <input type='text' value={to} onChange={(e) => setTo(e.currentTarget.value)} placeholder='choose someone...' />
          <input type='text' value={text} onChange={(e) => setText(e.currentTarget.value)} placeholder='your message' />
          <Button onClick={send}>Send</Button>
        </Row> */}
    


      <Modal show={modal} onHide={handleClose} style={{backgroundColor : '#000'}} >
        <div className='back-modal' style={{ padding: '40px', height: '90vh',  display: 'flex', justifyContent: 'space-between', flexDirection:'column'}}>
        <Modal.Header>
          
          <Modal.Title>
          <Navbar.Brand href="#home" style={{color: '#fff'}}>
            <img
              alt="brand"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Linkedin.svg/600px-Linkedin.svg.png"
              width="30"
              height="30"
              style={{marginRight: '10px'}}
             
            />
          LinkedIn Chat
    </Navbar.Brand>
         </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
          <label style={{fontSize: '12px', color: '#fff'}}>Enter your name</label>
              {/* <Form.Label>Hey, there !</Form.Label> */}
              <Form.Control className='modal-input text-white' type="text" value={tempUser} onChange={(e) => setTempUser(e.currentTarget.value)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={saveUser} style={{border: '1px solid #fff', background: 'none'}}>
            Start messaging
          </Button>
        </Modal.Footer>
        </div>
      </Modal>

    </div>
   
  );
}

export default App;
