<template>
    <div></div>
</template>
<script>
import app from '@/api/firebase.js'
import { getAuth, signOut } from 'firebase/auth'
const auth = getAuth(app)
console.log(app)
async function logout() {
  try {
    await signOut(auth)
    // ログアウト成功時の処理
    console.log('ログアウトしました')
    // 他の必要な処理を追加することもできます
  } catch (error) {
    // ログアウト失敗時の処理
    console.error('ログアウト時にエラーが発生しました', error)
  }
}
logout()
</script>
