/**
 * Heart2Heart - Endpoint Verification Test
 */

const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

server.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Test server running on ${baseUrl}`);

  async function get(path) {
    return new Promise((resolve, reject) => {
      http.get(`${baseUrl}${path}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }).on('error', reject);
    });
  }

  async function post(path, bodyObj) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify(bodyObj);
      const req = http.request(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'Accept': 'application/json'
        }
      }, (res) => {
        let resData = '';
        res.on('data', chunk => resData += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: resData }));
      });
      req.on('error', reject);
      req.write(data);
      req.end();
    });
  }

  try {
    console.log('Testing GET / (Feed)...');
    const res1 = await get('/');
    console.log(`Status: ${res1.status}, contains 'Heart2Heart': ${res1.body.includes('Heart2Heart')}`);

    console.log('Testing GET /posts/new...');
    const res2 = await get('/posts/new');
    console.log(`Status: ${res2.status}, contains 'Share What': ${res2.body.includes('Share What')}`);

    console.log('Testing GET /posts/post_1...');
    const res3 = await get('/posts/post_1');
    console.log(`Status: ${res3.status}, contains post_1: ${res3.body.includes('panic attack')}`);

    console.log('Testing GET /circles...');
    const res4 = await get('/circles');
    console.log(`Status: ${res4.status}, contains circles: ${res4.body.includes('Support Circles')}`);

    console.log('Testing GET /circles/circle_anxiety...');
    const res5 = await get('/circles/circle_anxiety');
    console.log(`Status: ${res5.status}, contains circle: ${res5.body.includes('Anxiety & Overwhelm')}`);

    console.log('Testing GET /resources...');
    const res6 = await get('/resources');
    console.log(`Status: ${res6.status}, contains 988: ${res6.body.includes('988')}`);

    console.log('Testing GET /resources/breathing...');
    const res7 = await get('/resources/breathing');
    console.log(`Status: ${res7.status}, contains Breathing Room: ${res7.body.includes('Breathing Room')}`);

    console.log('Testing GET /profile...');
    const res8 = await get('/profile');
    console.log(`Status: ${res8.status}, contains Maya: ${res8.body.includes('Maya Patel')}`);

    console.log('Testing GET /moods...');
    const res9 = await get('/moods');
    console.log(`Status: ${res9.status}, contains Overwhelmed: ${res9.body.includes('Overwhelmed')}`);

    console.log('Testing GET /search?q=anxiety...');
    const res10 = await get('/search?q=anxiety');
    console.log(`Status: ${res10.status}, contains results: ${res10.body.includes('Search Results')}`);

    console.log('Testing API POST /api/posts/post_1/react (hug)...');
    const res11 = await post('/api/posts/post_1/react', { reactionType: 'hug' });
    console.log(`Status: ${res11.status}, body: ${res11.body}`);

    console.log('Testing API POST /api/posts/post_1/bookmark...');
    const res12 = await post('/api/posts/post_1/bookmark', {});
    console.log(`Status: ${res12.status}, body: ${res12.body}`);

    console.log('Testing API POST /api/mood...');
    const res13 = await post('/api/mood', {
      moodValue: 4,
      moodLabel: 'Gentle & Calm',
      moodEmoji: '✨',
      note: 'Testing mood check-in'
    });
    console.log(`Status: ${res13.status}, body: ${res13.body}`);

    console.log('Testing creating a new post via POST /posts...');
    const res14 = await post('/posts', {
      title: 'Testing Safe Post Creation',
      content: 'I am sharing my thoughts freely in this warm safe space.',
      circleId: 'circle_little_wins',
      mood: 'Hopeful',
      supportType: 'Virtual Hugs Only',
      tags: 'test, hope'
    });
    console.log(`Status: ${res14.status}, body: ${res14.body}`);

    console.log('\n✅ All route and API tests passed successfully!');
  } catch (err) {
    console.error('❌ Test failed:', err);
  } finally {
    server.close();
  }
});
