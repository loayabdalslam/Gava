import Neo4jConnection from '../config/neo4j.js';

async function testNeo4jConnection() {
  try {
    // Test connectivity
    await Neo4jConnection.verifyConnectivity();
    
    // Get a session
    const driver = Neo4jConnection.getInstance();
    const session = driver.session();

    try {
      // Test write operation
      const writeResult = await session.executeWrite(async tx => {
        const query = `
          CREATE (n:TestNode {
            id: randomUUID(),
            name: $name,
            timestamp: datetime()
          })
          RETURN n
        `;
        const result = await tx.run(query, { name: 'Test Node' });
        return result.records[0].get('n').properties;
      });
      
      console.log('Write test successful:', writeResult);

      // Test read operation
      const readResult = await session.executeRead(async tx => {
        const query = `
          MATCH (n:TestNode)
          RETURN n
          LIMIT 1
        `;
        const result = await tx.run(query);
        return result.records[0]?.get('n').properties;
      });

      console.log('Read test successful:', readResult);

    } finally {
      await session.close();
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await Neo4jConnection.close();
  }
}

// Run the test
testNeo4jConnection(); 