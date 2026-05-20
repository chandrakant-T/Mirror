function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: '#1e1e1e',
            borderBottom: '1px solid #333',
        }}>
            <h1 style={{
                color: '#fff',
                fontSize: '22px',
                fontWeight: 'bold',
                margin: 0,
            }}>
                Mirror <span style={{ color: '#569cd6' }}>{'</>'}</span>
            </h1>
        </nav>
    )
}

export default Navbar