export function createListener(io, namespace, api) {
  const eventGet = `${namespace}:get`;
  const eventPost = `${namespace}:post`;
  const eventDelete = `${namespace}:delete`;

  return async function listeners(socket) {
    socket.on(eventGet, async () => {
      console.log(`all ${namespace}s requested`);

      try {
        const items = await api.get();
        io.emit(eventGet, { items });
      } catch (e) {
        console.log(e);
        io.emit(eventGet, { items: [] });
      }
    });

    socket.on(eventPost, async (item) => {
      console.log(`received ${namespace}: `, item);

      try {
        await api.post(item);
        const items = await api.get();
        io.emit(eventGet, { items });
      } catch (e) {
        console.log('error: ', e);
        io.emit(eventGet, { items: [] });
      }
    });

    socket.on(eventDelete, async (itemId) => {
      console.log(`requested deletion of ${namespace} with the id: `, itemId);

      try {
        await api.remove(itemId);
        // const items = await api.getItems();
        io.emit(eventDelete, { itemId });
      } catch (e) {
        console.log('error: ', e);
        io.emit(eventGet, { items: [] });
      }
    });
  };
}