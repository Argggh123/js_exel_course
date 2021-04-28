import $ from '@core/Dom/Dom';

export default function resize(event) {
  const resizer = $(event.target);
  const parent = resizer.closest('[data-type="resizable"]');
  const parentCords = parent.getCords();
  const cells = this.$root.findAll(`[data-col="${parent.data.col}"]`);
  const type = resizer.data.resize;
  let resizeDelta = 0;

  resizer.css({ opacity: '1' });

  document.onmousemove = (e) => {
    if (type === 'col') {
      resizeDelta = Math.floor(e.pageX - parentCords.right);
      resizer.css({ right: `-${resizeDelta}px` });
      return;
    }
    resizer.css({ bottom: `-${resizeDelta}px` });
    resizeDelta = Math.floor(e.pageY - parentCords.bottom);
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      const cellWidth = `${parentCords.width + resizeDelta}px`;
      cells.forEach((el: HTMLElement) => { $(el).css({ width: cellWidth }); });
      resizer.css({ opacity: '0', right: '0px' });
    } else {
      parent.css({ height: `${parentCords.height + resizeDelta}px` });
      resizer.css({ opacity: '0', bottom: '0px' });
    }
  };
}
