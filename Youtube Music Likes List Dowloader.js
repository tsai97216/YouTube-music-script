(async function() {
    console.log("🚀 開始自動滾動並抓取全量清單，請勿關閉視窗...");
    
    let lastHeight = 0;
    let scrollCount = 0;
    
    // 自動滾動邏輯
    while (true) {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise(r => setTimeout(r, 2000)); // 等待 2 秒讓新歌曲加載
        
        let newHeight = document.body.scrollHeight;
        if (newHeight === lastHeight) {
            scrollCount++;
            if (scrollCount > 2) break; // 連續三次高度沒變，代表到底了
        } else {
            lastHeight = newHeight;
            scrollCount = 0;
            console.log(`已滾動至高度: ${newHeight}，持續加載中...`);
        }
    }

    // 開始抓取
    const songRows = document.querySelectorAll('ytmusic-playlist-shelf-renderer ytmusic-responsive-list-item-renderer');
    let content = `我的 YouTube Music 喜歡的歌曲清單 (全量版)\n總計: ${songRows.length} 首歌\n` + "=".repeat(30) + "\n";

    songRows.forEach((row, index) => {
        const title = row.querySelector('.title-column yt-formatted-string')?.innerText || "未知歌名";
        const artistElements = row.querySelectorAll('.secondary-flex-columns yt-formatted-string');
        const artist = artistElements[0]?.innerText || "未知歌手";
        content += `${index + 1}. ${title} --- ${artist}\n`;
    });

    // 下載檔案
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YTM_Full_Liked_Songs_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log(`✅ 抓取完成！總共處理了 ${songRows.length} 首歌。`);
})();
