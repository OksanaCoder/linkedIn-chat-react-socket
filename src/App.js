import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Modal, Button, Row, Col, Container, Navbar, Form} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faCircle , faDotCircle} from '@fortawesome/free-solid-svg-icons'




import io from 'socket.io-client';

const options = {
  transports: ["websocket"]
}
let socket = io('https://striveschool.herokuapp.com/', options)


function App() {

  const [modal, setModal] = useState(true)
  const [username, setUsername] = useState('')
  const [tempUser, setTempUser] = useState('')
  const [messages, setMessages] = useState([])
  const [to, setTo] = useState('')
  const [text, setText] = useState('')

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
    setText('')
  }


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
      <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQH2ZpNTBJ0m0w/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=BVYN14q3UoE5y0p4TlilG_pff7mhlWL6Mx0xOgsAkJU'/>
      
            <small className='font-name'>Emmanuel</small>

  
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>

     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
      <div>
      <img className='img mr-4' src='     https://media-exp1.licdn.com/dms/image/C4E03AQHbwk5fnwxJzg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=cYXFtdZCLXu2TSSvgywqo1KffeRu9ZWFLs5ToOIC9B4'/>
       <small className='font-name'>Klevin</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li  className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQEhXHiVnQYhfA/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=9b9I4QpWGD7L_dcdjRP6hnCXaC8SZ7uoyErPD-umc8w'/>
       <small className='font-name'>Arbiona</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
     
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
       <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4E03AQFv0SNcfHQH8A/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=ikZm7WVzD8N6pp_Mn6z3dbkZDWPFYAW4xxCvulT4NW4'/>
       <small className='font-name'>Ubeyt</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQE6n7Iem46vpg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=il7Htnldai05gXxe1mFIAAnQfRbG2B05RuNqXZ5RvZ4'/>
       <small className='font-name'>Ervins</small>
       </div> 
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
   
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4D03AQFSzZk5YOd2lg/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=POCaCd3_ddOtHZ_p23-t7LVLb8ZlngJbcrFiuOKGYaw'/>
       <small className='font-name'>Nathalie</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C5603AQEmKU0TgsZoSA/profile-displayphoto-shrink_400_400/0?e=1602115200&v=beta&t=2mofxHBpy9KbxQKHivhcKbQcKktfyY6a6OUPXPPXom0'/>
       <small className='font-name'>Diego</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
    
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
       <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4E03AQF2F_Kj1ThAqA/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=TanyyO1QsDUcK0ugOZsQFjBLWYPngCqwvhVEiDHFADU
'/>
       <small className='font-name'>Marigona</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
      <div>
       <img className='img mr-4' src='https://media-exp1.licdn.com/dms/image/C4D03AQFWqJ4Tsv-V_g/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=iON6M7NKjVWzJHta8sQw2PXykR6oWMVjyDRY6Vf1Zyo'/>
       <small className='font-name'>Alina</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} />
     </li>
     <li className='line' style={{display: 'flex', justifyContent: 'space-between', alignItems:'center', width: '80%', margin: '20px auto'}}>
     <div>
       <img className='img mr-4' src=' https://ca.slack-edge.com/TJNQP8XCG-U010MP9GNAX-0af0ddad44ba-512'/>
       <small className='font-name'>Detart</small>
       </div>
       <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faDotCircle} />
       
     </li>


      </ul>

      </div>



      <div className='col col-lg-6 col-sm-12' style={{ position: 'relative', height:'90vh', margin: '3px', border: '1px solid #CECFD2'}}>

     <div style={{
            margin: '0 auto',
            position: 'absolute', 
            top: '0',
            width: "100%",
            display: "flex",
            padding: '20px 30px',
  
            borderBottom: '1px solid #CECFD2'
            

          }}>
            
       <h6>{to}
       { to ? <FontAwesomeIcon style={{marginLeft: '10px', color: 'green'}} icon={faCircle} /> : '' }
       </h6> 
     </div>
      <ul style={{  height:'93%', listStyle: "none", padding: "40px", marginTop: '20px'}}>

      {messages.map(message => {
          return (
            <li  style={{display: 'flex', justifyContent:'flex-start', alignItems: 'center', marginTop:'15px'}}>
               {/* {message.from} == 'Emmanuel' ?
              return (
              <img className='img mr-1' src='https://media-exp1.licdn.com/dms/image/C5603AQH2ZpNTBJ0m0w/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=BVYN14q3UoE5y0p4TlilG_pff7mhlWL6Mx0xOgsAkJU'/>
              ) : {message.from} == 'Ksysha' ?
              return (
              <img className='img mr-1' src='https://media-exp1.licdn.com/dms/image/C4E03AQEc2diO-PX-zw/profile-displayphoto-shrink_400_400/0?e=1601510400&v=beta&t=B2humeGo9ebxMdUGUE4aZ1XKTCrAcWGAdDKV76WE4mo'/>
              )
            } */}
               <small style='shadow' style={{ backgroundColor : '#F5F5F5', padding: '10px 20px', width: '30%', borderRadius: '20px', color: '#000'}}> {message.msg}</small>
               <strong className='text-muted ml-3' style={{fontSize: '10px'}}>  {message.from}</strong> 
            </li>
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
            style={{ flex: "1 0 0",  padding: '15px 20px', borderRadius: '50px', border: 'none', background: '#DEE4E6'}}
           className='outline-none search'
            placeholder='Your message...' 
          />
          <Button type="send" className="btn-send outline-none" >
             <FontAwesomeIcon icon={faPaperPlane}  onClick={send} style={{color: '#fff', fontSize: '35px', marginLeft: '5px', backgroundColor: '#4b7efc', padding: '10px', borderRadius: '50%' }}/>
          </Button>
        </form>
        </div>

        
        </div>
        <div className='col col-lg-2 col-sm-12' style={{padding: '5px', height:'90vh', margin: '3px', border: '1px solid #CECFD2'}}>
       </div>
        </div>
        {/* <Row>

          <input type='text' value={to} onChange={(e) => setTo(e.currentTarget.value)} placeholder='choose someone...' />
          <input type='text' value={text} onChange={(e) => setText(e.currentTarget.value)} placeholder='your message' />
          <Button onClick={send}>Send</Button>
        </Row> */}
    


      <Modal show={modal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Welcome !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
              {/* <Form.Label>Hey, there !</Form.Label> */}
              <Form.Control type="text" placeholder="Enter your name" value={tempUser} onChange={(e) => setTempUser(e.currentTarget.value)} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
   
  );
}

export default App;
