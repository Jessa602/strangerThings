const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const { data } = await response.json();
    return data.posts;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchPostById(postId) {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const { data } = await response.json();
    return data.post;
  } catch (error) {
    console.error(error);
  }
}
