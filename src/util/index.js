/**
 * @description 父子关系的数组转换成树形结构数据
 * @param data
 * @returns {*}
 */
export function translateDataToTree(data) {
    const parent = data.filter(
        (value) => value.parentId === 'undefined' || value.parentId == null
    )
    const children = data.filter(
        (value) => value.parentId !== 'undefined' && value.parentId != null
    )
    const translator = (parent, children) => {
        parent.forEach((parent) => {
            children.forEach((current, index) => {
                if (current.parentId === parent.id) {
                    parent.hasChildren = false
                    const temp = JSON.parse(JSON.stringify(children))
                    temp.splice(index, 1)
                    translator([current], temp)
                    typeof parent.children !== 'undefined'
                        ? parent.children.push(current)
                        : (parent.children = [current])
                }
            })
        })
    }
    translator(parent, children)
    return parent
}

/**
* @description 树形结构数据转换成父子关系的数组
* @param data
* @returns {[]}
*/
export function translateTreeToData(data) {
    const result = []
    data.forEach((item) => {
        const loop = (data) => {
            result.push({
                id: data.id,
                name: data.name,
                parentId: data.parentId,
            })
            const child = data.children
            if (child) {
                for (let i = 0; i < child.length; i++) {
                    loop(child[i])
                }
            }
        }
        loop(item)
    })
    return result
}