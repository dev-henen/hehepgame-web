 <!-- Promotions -->
 <section class="relative">
    <div class="overflow-x-auto no-scrollbar flex gap-4 p-2">
      {#each [1,2,3,1] as img}
        <a href="#/1" class="block min-w-[200px] md:min-w-[300px]">
          <img src={`/images/1 (${img}).PNG`} alt="Promo" class="rounded-2xl h-[150px] md:h-[200px] object-cover"/>
        </a>
      {/each}
    </div>
  </section>

  <!-- Activities -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#131214] p-6 rounded-xl">
    
    <div>
      <h2 class="text-lg font-bold mb-4"><span class="text-red-500"><i class="bi bi-tag"></i> Much</span> Wow Wins</h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src="/images/2 (7).PNG" alt="Icon" class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"/>
          <div>
            <div class="text-gray-400 text-xs md:text-sm">Everyday</div>
            <div class="text-xs md:text-sm">Won: <mark class="gradient-text">$9,453,992</mark> in casino</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <img src="/images/2 (6).PNG" alt="Icon" class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"/>
          <div>
            <div class="text-gray-400 text-xs md:text-sm">Weekly</div>
            <div class="text-xs md:text-sm">Won: <mark class="gradient-text">$10,000,452</mark> in BC Originals</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-4"><span class="text-yellow-400"><i class="bi bi-star"></i> Top</span> Winning Games</h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src="/images/2 (5).PNG" alt="Icon" class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"/>
          <div>
            <div class="text-xs md:text-sm">Profit: <mark class="gradient-text">$95,000,000</mark> in Crany Cash Flit</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <img src="/images/2 (4).PNG" alt="Icon" class="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"/>
          <div>
            <div class="text-xs md:text-sm">Profit: <mark class="gradient-text">$8,400,222</mark> in First Cash Push</div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-4"><span class="text-green-400"><i class="bi bi-check-circle"></i> Trending</span> Right Now</h2>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src="/images/2 (1).PNG" alt="Icon" class="w-16 h-16 rounded-lg object-cover"/>
          <div>
            <div class="text-xs md:text-sm">OCash</div>
            <div class="text-gray-400 text-[10px] md:text-xs">BC Originals</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <img src="/images/2 (2).PNG" alt="Icon" class="w-16 h-16 rounded-lg object-cover"/>
          <div>
            <div class="text-xs md:text-sm">Numeric</div>
            <div class="text-gray-400 text-[10px] md:text-xs">Lottery</div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <img src="/images/2 (3).PNG" alt="Icon" class="w-16 h-16 rounded-lg object-cover"/>
          <div>
            <div class="text-xs md:text-sm">Lucky</div>
            <div class="text-gray-400 text-[10px] md:text-xs">BC Originals</div>
          </div>
        </div>
      </div>
    </div>

  </section>