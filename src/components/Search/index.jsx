import React from 'react'
import { Input, AutoComplete } from 'antd'
import styles from './search.module.css'
import { getLocalStorage } from '../../utils/helpers'

const Search = ({ setSearch }) => {
	const options = getLocalStorage()

	const onSearch = async (value) => {
		setSearch(value)
	}

	return (
		<div className={styles.searchContainer}>
			<h2 className={styles.title}>Search Photos</h2>

			<AutoComplete
				dropdownMatchSelectWidth={252}
				style={{ width: 300 }}
				options={options}
				onSelect={onSearch}
				onSearch={onSearch}
				dropdownClassName={styles.dropdown}
			>
				<Input.Search size='large' onKeyDown={onSearch} placeholder='input here' enterButton />
			</AutoComplete>
		</div>
	)
}

export default Search
