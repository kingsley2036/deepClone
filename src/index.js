let cache = []
const deepClone = (source) => {
	if (source instanceof Object) {
		let cachedDist = findCache(source)
		if (cachedDist) {
			return cachedDist
		} else {
			let dist
			if (source instanceof Array) {
				dist = []
			} else if (source instanceof Function) {
				dist = function () {
					return source.apply(this, arguments)
				}
			} else {
				dist = {}
			}
      // 考虑到环属性的原因,需要先缓存
      // 生成dist之后就可以放到缓存里面了,也不影响后续dist属性的添加
      cache.push([source, dist])
			for (let key in source) {
				dist[key] = deepClone(source[key])
			}
      return dist
		}
	}
	return source
}
const findCache = (source) => {
	for (let i = 0; i < cache.length; i++) {
		if (cache[i][0] === source) {
			return cache[i][1]
		}
	}
}
module.exports = deepClone

