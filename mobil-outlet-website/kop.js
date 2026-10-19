(() => {
  const products = [
    {model:'iPhone 15', brand:'Apple', storage:'128 GB', condition:'Som ny', price:7490, color:'Grön', badge:'Populär'},
    {model:'iPhone 13', brand:'Apple', storage:'128 GB', condition:'Mycket bra', price:4590, color:'Midnatt', badge:'Bra värde'},
    {model:'Galaxy S24', brand:'Samsung', storage:'128 GB', condition:'Som ny', price:6490, color:'Svart', badge:'Nyinkommen'},
    {model:'Galaxy S23', brand:'Samsung', storage:'128 GB', condition:'Mycket bra', price:4990, color:'Grön', badge:''},
    {model:'Pixel 8', brand:'Google', storage:'128 GB', condition:'Bra', price:3990, color:'Obsidian', badge:''},
    {model:'iPhone 12', brand:'Apple', storage:'64 GB', condition:'Bra', price:2990, color:'Blå', badge:'Prisvärd'},
  ];
  const grid = document.querySelector('#product-grid');
  const emptyState = document.querySelector('#empty-state');
  const searchInput = document.querySelector('#search-input');
  const brandFilter = document.querySelector('#brand-filter');
  const conditionFilter = document.querySelector('#condition-filter');

  const renderPhone = (product) => `<article class="product-card"><div class="product-art product-${product.brand.toLowerCase()}"><span class="product-camera"></span><strong>${product.brand === 'Apple' ? '' : product.brand === 'Samsung' ? 'S' : 'G'}</strong>${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}</div><div class="product-info"><div class="product-meta"><span>${product.brand}</span><span>${product.condition}</span></div><h3>${product.model}</h3><p>${product.storage} · ${product.color}</p><div class="product-bottom"><strong>${product.price.toLocaleString('sv-SE')} kr</strong><a href="mailto:info@mobil-outlet.se?subject=Intresse%20för%20${encodeURIComponent(product.model)}&body=Hej%20Mobil%20Outlet%2C%0A%0AJag%20är%20intresserad%20av%20${encodeURIComponent(product.model)}%20${encodeURIComponent(product.storage)}." aria-label="Visa intresse för ${product.model}">Visa intresse <span aria-hidden="true">↗</span></a></div></div></article>`;

  const render = () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = products.filter((product) => {
      const matchesSearch = `${product.brand} ${product.model}`.toLowerCase().includes(query);
      const matchesBrand = brandFilter.value === 'all' || product.brand === brandFilter.value;
      const matchesCondition = conditionFilter.value === 'all' || product.condition === conditionFilter.value;
      return matchesSearch && matchesBrand && matchesCondition;
    });
    grid.innerHTML = filtered.map(renderPhone).join('');
    emptyState.hidden = filtered.length > 0;
  };

  [searchInput, brandFilter, conditionFilter].forEach((control) => control.addEventListener('input', render));
  render();
})();
