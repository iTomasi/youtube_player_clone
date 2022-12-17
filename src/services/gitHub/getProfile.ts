import { FetchGitHub } from 'services/FetchBase'

const USERNAME = 'iTomasi'

const getProfile = async () => {
  const payload = {
    username: USERNAME,
    followers: 0,
    profile_picture: '/img/profile.jpeg'
  }

  try {
    const fetching = await FetchGitHub('/users/' + USERNAME)
    const data = await fetching.json()

    if (!data.message) {
      payload.username = data.login
      payload.followers = data.followers
      payload.profile_picture = data.avatar_url
    }

    return payload
  }

  catch(e) {
    console.log(e)
    console.log('getProfile() Error')
    return payload
  }
}

export default getProfile