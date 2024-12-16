export default function NotFound() {
    return (
      <main style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        textAlign: 'center', 
        flexDirection: 'column'
      }}>
        <h1 style={{ fontSize: '4rem' }}>Not Found</h1>
        <p style={{ fontSize: '1.5rem' }}>
          Unfortunately we could not find the requested page.
        </p>
      </main>
    );
  }
  