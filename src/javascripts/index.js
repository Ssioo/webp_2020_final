const productContainer = document.getElementById('product_table')
const search = document.getElementById('search_box')

window.onload = async () => {
  if (!await sessionStorage.getItem('x-access-token')) {
    window.location.href = '/src/views/login.html'
    return
  }
  const products = await fetchProduct()
  drawProducts(products)

  search.onkeyup = () => {
    const keyword = search.value
    drawProducts(products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
      || product.user_name.toLowerCase().includes(keyword.toLowerCase())
      || product.email.toLowerCase().includes(keyword.toLowerCase())
    ))
  }
}

const fetchProduct = async () => {
  try {
    const res = await get('/product')
    if (res.code !== 200) throw new Error(res.msg)
    return res.data
  } catch (e) {
    alert(e.message)
    return []
  }
}

const drawProducts = (products) => {
  productContainer.innerHTML = ''
  products.forEach((product) => {
    const item = getProductItemView(product)
    productContainer.appendChild(item)
  })
}

const getProductItemView = (product) => {
  const item = document.createElement('div')
  item.classList.add('product_item')
  item.innerHTML = `
            <div class="product_item_column">
                <img class="product_item_img" alt="" src="${product.img}">
            </div>
            <div class="product_item_column">
                <div class="product_item_title">${product.name}</div>
                <div class="product_item_user">${product.email}</div>
                <div class="product_item_desc">${product.user_name}</div>
            </div>
            <div class="product_item_column">
                <div style="flex: 1; text-align: right">${product.price} 원</div>
            </div>`
  item.onclick = () => {
    window.location.href = '/src/views/product.html'
  }
  return item
}
