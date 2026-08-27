import AMapLoader from '@amap/amap-jsapi-loader'

window._AMapSecurityConfig = {
  securityJsCode: '267cc42295ad8da523ae2f4e6ef0d664',
}

export async function getAMap() {
  return await AMapLoader.load({
    key: '5c6d15718249853082a5d981f1c238eb', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
}

export async function mapPositionById(id: string) {
  const AMap = await getAMap()
  const map = new AMap.Map(id, {
    zoom: 14,
  })

  return map
}

/** 获取定位城市 */
export async function citySearch(): Promise<{ province: string, city: string, bounds: any }> {
  const AMap = await getAMap()
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.CitySearch', () => {
      const citySearch = new AMap.CitySearch()
      citySearch.getLocalCity((status: any, result: any) => {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息

          console.warn('高德定位-citySearch', result)
          resolve({
            province: result.province,
            city: result.city,
            bounds: result.bounds,
          })
        }
        else {
          reject(new Error('定位失败'))
        }
      })
    })
  })
}
