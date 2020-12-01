import React, {useEffect} from 'react'
import {useStores} from 'src/stores'

const Main = () => {
  const {demoStore} = useStores()

  useEffect(() => {
    demoStore.getDemoinfo({id: 1606796764967}).then((res: any) => {
      console.log('demo-get-info-from-db', res)
    })
  }, [])

  const onAdd = async () => {
    const id = +new Date()
    const name = 'projectname' + id
    const res = await demoStore.setDemoInfo({id, name})
    console.log('===done===', res)
    alert('done')
  }
  return <div onClick={() => onAdd()}>addd</div>
}

export default Main
