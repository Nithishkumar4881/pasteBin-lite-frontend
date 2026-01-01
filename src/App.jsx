import {useState} from 'react';
require('dotenv').config();


function App() {
  const [content, setContent] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [resData, setResData] = useState(null);

  const handleSubmit = async () => {
    const payload = {
      content,
      expiresAt: expiresAt ? parseInt(expiresAt) : null,
      maxViews: maxViews ? parseInt(maxViews) : null,
    };

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/pastes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResData(data);
      // Optionally, you can clear the form or show a success message here
    } catch (error) {
      console.error('Error creating paste:', error);
      // Optionally, you can show an error message to the user here
    }
  };


  return (
    <>
    <div style={{display:"flex", flexDirection:"column", gap:"10px", width:"300px", margin:"auto", marginTop:"50px"}}>
    <input type="textarea" placeholder="Type something..." value={content} onChange={(e) => setContent(e.target.value)} style={{height:"100px"}}/>
    <input type="number" placeholder="Expire seconds (optional)" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} style={{
      height:"30px"
    }}/>
    <input type='number' placeholder='max views (optional)' value={maxViews} onChange={(e) => setMaxViews(e.target.value)} style={{height:"30px"}} />
    <button onClick={handleSubmit}>Submit</button>
    </div>
    {resData && (
      <div style={{marginTop:"20px", textAlign:"center"}}>
        <h3>Content Created!</h3>
        <p><a href={resData.url} target="_blank">{resData.url}</a></p>
        
      </div>)}
    </>
  )
}

export default App
