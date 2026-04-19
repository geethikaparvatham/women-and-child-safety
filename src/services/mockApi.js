const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const sendSosToPolice = async (payload) => {
  await wait(700)
  return { ok: true, incidentId: `INC-${Date.now()}`, payload }
}

export const notifyTrustedContacts = async (contacts) => {
  await wait(500)
  return {
    ok: true,
    sentCount: contacts.length,
  }
}

export const storeComplaint = async (complaint) => {
  await wait(600)
  return { ok: true, complaintId: `CMP-${Date.now()}`, complaint }
}
