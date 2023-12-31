'use client';

import { ProjectInterface, SessionInterface } from '@/common.types';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import FormField from '../create-project/FormField';
import { categoryFilters } from '@/constants';
import Button from './Button';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import CustomMenu from './CustomMenu';

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

enum PossibleChildTypes {
  Create = 'create',
}
const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    site: project?.site || '',
    githubURL: project?.githubURL || '',
    category: project?.category || '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { token } = await fetchToken();
    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);
        router.push('/');
      }
      if (type === 'edit') {
        await updateProject(form, project?.id as string, token);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target?.files?.[0];
    if (!file) return;
    if (!file.type.includes('image')) {
      return alert('Please upload an image file.');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange('image', result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a thumbnail for your project.'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          required={type === PossibleChildTypes.Create}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form?.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form?.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form?.description}
        placeholder="Showcase and discover remarkable dev projects"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form?.site}
        placeholder="https://hello.com"
        setState={(value) => handleStateChange('site', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form?.githubURL}
        placeholder="Github URL"
        setState={(value) => handleStateChange('githubURL', value)}
      />
      <CustomMenu
        title="Category"
        state={form?.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
          handleClick={handleFormSubmit}
        ></Button>
      </div>
    </form>
  );
};

export default ProjectForm;
