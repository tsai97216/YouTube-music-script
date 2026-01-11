let total = 0;
let left = 0;
let interval = 10; // 每組間隔 10 秒

const ytmLog = msg => console.log(`[YTM Liker] ${msg}`);

const chunk = size => array => array.reduce((result, item) => {
    if (result[result.length - 1].length < size) {
        result[result.length - 1].push(item);
    } else {
        result.push([item]);
    }
    return result;
}, [[]]);

function likeAll() {
    // 同時支援中英文標籤
    let els = Array.from(document.querySelectorAll("button[aria-pressed='false']")).filter(btn => {
        const label = btn.getAttribute("aria-label");
        return label === "喜歡" || label === "Like";
    });

    total = els.length; 
    left = total;
    
    if (total === 0) {
        ytmLog("找不到任何尚未按讚的歌曲！請確認頁面已滑到最底且按鈕標籤正確。");
        return;
    }

    ytmLog(`準備開始！總共需按讚: ${total} 首歌`);

    let cels = chunk(5)(els);
    cels.forEach(function(items, index) {
        setTimeout(function() {
            ytmLog('正在處理下一組 (5首)...');
            items.forEach(el => el.click());
            left = Math.max(0, left - 5);
            ytmLog(`本組完成。目前剩餘: ${left} / ${total}`);
            if (left === 0) ytmLog('🎉 全部任務已完成！');
        }, index * interval * 1000);
    });
}

likeAll();
