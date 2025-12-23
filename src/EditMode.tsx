
export default function EditMode() {

    return (
        <>
            <input
                value={editedUser.firstName || ''}
                className='px-3 py-2 border rounded-md w-40'
            />
            <input
                value={editedUser.lastName || ''}
                className='px-3 py-2 border rounded-md w-40'
            />
            <input
                value={editedUser.age || ''}
                type='number'
                className='px-3 py-2 border rounded-md w-24'
            />
            <input
                value={editedUser.email || ''}
                className='px-3 py-2 border rounded-md w-64'
            />
            <input
                value={editedUser.password || ''}
                type='password'
                className='px-3 py-2 border rounded-md w-40'
            />
        </>
    )
}
